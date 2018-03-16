mkdir -p staging-deploy
cp -r public/* staging-deploy
cp public/.htaccess staging-deploy
cp staging-robots.txt staging-deploy/robots.txt
scp -r ./staging-deploy/. bibblue546832154@biblicalblueprints.org:/home/bibblue546832154/staging.biblicalblueprints.org
rm -rf staging-deploy
