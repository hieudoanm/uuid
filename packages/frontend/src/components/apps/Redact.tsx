import * as fabric from 'fabric';
import { saveAs } from 'file-saver';
import { PDFDocument, PDFImage, rgb } from 'pdf-lib';
import { FC, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Navbar } from '@editor/components/shared/Navbar';
import { Divider } from '../shared/Divider';
import { Glass } from '../shared/Glass';
const NODE_ENV: 'development' | 'production' | 'test' =
  process.env.NODE_ENV ?? 'development';
const BASE_PATH: string = NODE_ENV === 'development' ? '' : '/micro';

pdfjs.GlobalWorkerOptions.workerSrc = `${BASE_PATH}/workers/pdf.worker.min.js`;

type RedactionBox = { x: number; y: number; width: number; height: number };
type FabricCanvas = fabric.Canvas;

const Redact: FC = () => {
  const [
    {
      redactions = {},
      redoStack = {},
      file = null,
      numberOfPages = 0,
      scale = 1.5,
    },
    setState,
  ] = useState<{
    redactions: Record<number, RedactionBox[]>;
    redoStack: Record<number, RedactionBox[]>;
    file: File | null;
    numberOfPages: number;
    scale: number;
  }>({
    redactions: {},
    redoStack: {},
    file: null,
    numberOfPages: 0,
    scale: 1.5,
  });

  const canvasRefs = useRef<Record<number, FabricCanvas>>({});

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setState((previous) => ({
        ...previous,
        file: f,
        redactions: {},
        redoStack: {},
      }));
    }
  };

  const handleExport = async () => {
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);

    Object.entries(redactions).forEach(([pageIndexStr, boxes]) => {
      const pageIndex = Number(pageIndexStr);
      const page = pdfDoc.getPage(pageIndex);
      boxes.forEach(({ x, y, width, height }) => {
        page.drawRectangle({
          x,
          y: page.getHeight() - y - height,
          width,
          height,
          color: rgb(0, 0, 0),
        });
      });
    });

    const modifiedBytes: Uint8Array<ArrayBufferLike> = await pdfDoc.save();
    const arrayBuffer = modifiedBytes.slice().buffer;
    saveAs(
      new Blob([arrayBuffer], { type: 'application/pdf' }),
      'redacted.pdf',
    );
  };

  const initFabric = (el: HTMLCanvasElement | null, pageIndex: number) => {
    if (!el || canvasRefs.current[pageIndex]) return;

    const canvas = new fabric.Canvas(el, {
      selection: false,
      renderOnAddRemove: true,
    });
    canvas.setDimensions({ width: el.width, height: el.height });
    canvasRefs.current[pageIndex] = canvas;

    let isDown = false;
    let rect: fabric.Rect;
    let origX = 0;
    let origY = 0;

    canvas.on('mouse:down', (o) => {
      isDown = true;
      const pointer = canvas.getViewportPoint(o.e);
      origX = pointer.x;
      origY = pointer.y;
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        fill: 'black',
        width: 0,
        height: 0,
        selectable: false,
      });
      canvas.add(rect);
    });

    canvas.on('mouse:move', (o) => {
      if (!isDown) return;
      const pointer = canvas.getViewportPoint(o.e);
      rect.set({
        width: pointer.x - origX,
        height: pointer.y - origY,
      });
      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      isDown = false;
      const box: RedactionBox = {
        x: rect.left / scale,
        y: rect.top / scale,
        width: rect.width / scale,
        height: rect.height / scale,
      };
      setState((prev) => ({
        ...prev,
        redactions: {
          ...prev.redactions,
          [pageIndex]: [...(prev.redactions[pageIndex] ?? []), box],
        },
        redoStack: {
          ...prev.redoStack,
          [pageIndex]: [],
        },
      }));
    });
  };

  const handleUndo = () => {
    const pagesWithRedactions = Object.entries(redactions).filter(
      ([, boxes]) => boxes.length > 0,
    );
    if (pagesWithRedactions.length === 0) return;

    const [lastPageStr] = pagesWithRedactions[pagesWithRedactions.length - 1];
    const pageIndex = Number(lastPageStr);
    const canvas = canvasRefs.current[pageIndex];
    if (!canvas) return;

    const objects = canvas.getObjects('rect');
    if (objects.length > 0) {
      const lastRect = objects[objects.length - 1];
      canvas.remove(lastRect);
      canvas.renderAll();
    }

    setState((prev) => {
      const redactionsOnPage = [...(prev.redactions[pageIndex] ?? [])];
      const popped = redactionsOnPage.pop();
      if (!popped) return prev;

      return {
        ...prev,
        redactions: {
          ...prev.redactions,
          [pageIndex]: redactionsOnPage,
        },
        redoStack: {
          ...prev.redoStack,
          [pageIndex]: [...(prev.redoStack[pageIndex] ?? []), popped],
        },
      };
    });
  };

  const handleRedo = () => {
    const pagesWithRedo = Object.entries(redoStack).filter(
      ([, boxes]) => boxes.length > 0,
    );
    if (pagesWithRedo.length === 0) return;

    const [lastPageStr] = pagesWithRedo[pagesWithRedo.length - 1];
    const pageIndex = Number(lastPageStr);
    const canvas = canvasRefs.current[pageIndex];
    if (!canvas) return;

    const redoBoxes = [...(redoStack[pageIndex] ?? [])];
    const redoBox = redoBoxes.pop();
    if (!redoBox) return;

    const rect = new fabric.Rect({
      left: redoBox.x * scale,
      top: redoBox.y * scale,
      width: redoBox.width * scale,
      height: redoBox.height * scale,
      fill: 'black',
      selectable: false,
    });
    canvas.add(rect);
    canvas.renderAll();

    setState((prev) => ({
      ...prev,
      redactions: {
        ...prev.redactions,
        [pageIndex]: [...(prev.redactions[pageIndex] ?? []), redoBox],
      },
      redoStack: {
        ...prev.redoStack,
        [pageIndex]: redoBoxes,
      },
    }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Divider />
      <div className="mt-8 flex justify-center gap-4">
        <Glass.Button>
          <label className="cursor-pointer">
            <span>Upload PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        </Glass.Button>
        {file && (
          <>
            <Glass.Button type="button" onClick={handleUndo}>
              Undo Redaction
            </Glass.Button>
            <Glass.Button type="button" onClick={handleRedo}>
              Redo Redaction
            </Glass.Button>
            <Glass.Button type="button" onClick={handleExport}>
              Export PDF
            </Glass.Button>
          </>
        )}
      </div>
      {/* Main */}
      {file && (
        <div className="container mx-auto flex flex-col gap-y-8 p-8">
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-8"></div>
            <div className="w-full overflow-hidden rounded-xl border border-neutral-800 shadow-2xl">
              <div className="w-full overflow-auto">
                <Document
                  file={file}
                  onLoadSuccess={({ numPages }) =>
                    setState((previous) => ({
                      ...previous,
                      numberOfPages: numPages,
                    }))
                  }>
                  {Array.from({ length: numberOfPages }, (_, i) => (
                    <div key={i} className="relative">
                      <Page
                        pageNumber={i + 1}
                        scale={scale}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                      <canvas
                        id={`canvas-${i}`}
                        ref={(el) => initFabric(el, i)}
                        width={scale * 794}
                        height={scale * 1123}
                        className="pointer-events-auto absolute top-0 left-0 z-10 h-full w-full"
                      />
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Redact;
