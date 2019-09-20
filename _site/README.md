## Hello
docker run

docker run --rm --volume=${PWD}:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle jekyll/builder bash -c "jekyll build && echo 'upload command here'"

docker run --name blog_de_serve -it --rm --volume=D:\github\HuaTrung.github.io:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle -p 4000:4000 jekyll/jekyll jekyll serve --force_polling
