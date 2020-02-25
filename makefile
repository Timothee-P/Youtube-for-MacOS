default:
	@./node_modules/.bin/grunt
	@./node_modules/.bin/electron ./

install:
	@npm i && npm prune

bundle:
	@./node_modules/.bin/grunt
	@./node_modules/.bin/electron-packager ./ "Youtube" \
		--platform=darwin \
		--arch=all \
		--icon=./app/assets/icon.icns \
		--overwrite \
		--out=build \
		&& open build/Youtube-darwin-x64/Youtube.app