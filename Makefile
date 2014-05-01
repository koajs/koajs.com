
RAW = https://raw.githubusercontent.com

DOCS = public/index.md \
  public/context.md \
  public/request.md \
  public/response.md \
  public/guide.md

index.html: views/index.jade $(DOCS)
	@./node_modules/.bin/jade $< -o .

public/index.md:
	curl -s $(RAW)/koajs/koa/master/docs/api/index.md \
	  | ./rewrite.js > $@

public/context.md:
	curl -s $(RAW)/koajs/koa/master/docs/api/context.md \
	  | ./rewrite.js > $@

public/request.md:
	curl -s $(RAW)/koajs/koa/master/docs/api/request.md \
	  | ./rewrite.js > $@

public/response.md:
	curl -s $(RAW)/koajs/koa/master/docs/api/response.md \
	  | ./rewrite.js > $@

public/guide.md:
	curl -s $(RAW)/koajs/koa/master/docs/guide.md \
	  | ./rewrite.js > $@

clean:
	rm -fr *.html $(DOCS)

.PHONY: clean
