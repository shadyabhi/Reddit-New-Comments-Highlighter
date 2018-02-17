update:
	wget -qO kango-framework-latest.zip http://kangoextensions.com/kango/kango-framework-latest.zip
	unzip -q -o -d kango_dir kango-framework-latest.zip
	rm kango-framework-latest.zip

build:
	python kango_dir/kango.py build ./
