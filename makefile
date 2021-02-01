default:
	@./node_modules/.bin/grunt dev
	@./node_modules/.bin/electron ./

install:
	@npm i && npm prune

bundle:
	@./node_modules/.bin/grunt prod
	@./node_modules/.bin/electron-packager ./ "Youtube" \
		--platform=darwin \
		--arch=all \
		--icon=./app/assets/icon.icns \
		--overwrite \
		--out=build 