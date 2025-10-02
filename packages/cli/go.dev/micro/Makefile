lint:
	go vet ./...

format:
	go fmt ./...

build:
	go vet ./...
	go fmt ./...
	rm -rf ./bin
	go build -o ./bin/micro ./main.go

install:
	go vet ./...
	go fmt ./...
	rm -rf ./bin
	go build -o ./bin/micro ./main.go
	mkdir -p ~/bin
	cp ./bin/micro ~/bin/
	chmod +x ~/bin/micro
	export PATH="$(HOME)/bin:$(PATH)"
