#!/bin/sh

if [ "$1" = "b2c" ]; then
	dist_dir=dist/b2cdemospa
	spa_dir=../spartacusstorefront/web/webroot
	ENV_TYPE="b2c"
elif [ "$1" = "b2b" ]; then
	dist_dir=dist/b2bdemospa
	spa_dir=../b2bspartacusstorefront/web/webroot
	ENV_TYPE="b2b"
else
	echo "Environment type is empty or has wrong value. Available types: b2b, b2c."
	exit;
fi

if [ ! -d $dist_dir ]; then
	echo "Unable to find dist directory for $ENV_TYPE environment. Please perform: ./build-production.sh $ENV_TYPE"
	exit;
fi

if [ -d  $spa_dir ]; then
	echo "Deploy started for $ENV_TYPE environment."
	for x in main polyfills runtime vendor; do
		rm $spa_dir/$x.*.js
		rm $spa_dir/$x.*.js.map
	done
	rm $spa_dir/styles.*.css
	rm $spa_dir/styles.*.css.map

	cp -v src/manifest.json $spa_dir
	cp -rv $dist_dir/* $spa_dir

else
	echo "Unable to find storefront, invalid directory: $spa_dir"
fi
