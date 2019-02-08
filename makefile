default:
	@./node_modules/.bin/electron ./app

install:
	@npm i && npm prune
	@cd app && npm i && npm prune

bundle:
	@./node_modules/.bin/electron-packager ./app "Youtube" \
		--platform=darwin \
		--arch=all \
		--icon=./icon.icns \
		--overwrite \
		--asar=true \
		--out=build \
		&& open build/Youtube-darwin-x64/Youtube.app