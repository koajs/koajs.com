{
    filters:
    {
        markdown: function (text)
        {
            var marked = require("marked");
            var renderer = new marked.Renderer();
            // var highlight = require('highlight.js').highlight;
            var runkitRegExp = /^<!--\s*runkit:endpoint((.|\n)*)-->(.|\n)*$/;
            var runkitContext = { options: '{}', activated: false };

            renderer.code = function(code, lang, escaped) {

                if (!global.exampleCount)
                    global.exampleCount = 0;

                // var out = highlight(lang, code).value || code;
                var out = code
                var escaped = out !== code ? out : escapeCode(out, true);
                var id = "example-" + (global.exampleCount++);

                var script = runkitContext.activated ? "<script>(" + endpoint + ")(\"" + id + "\")</script>" : "";

                runkitContext.activated = false;

                return "<div id = \"" + id + "\"><pre><code class = \"lang-" + lang + "\">" + escaped + "</code></pre></div>" + script;
            };

            renderer.html = function(text) {
                var result = runkitRegExp.exec(text);

                if (!result) return text;

                runkitContext.activated = true;

                return text;
            };

            return marked(text, { renderer: renderer });

            function endpoint(id, count) {
            
                if (!window.RunKit)
                    if (typeof count === "undefined" || count < 20)
                        return setTimeout(endpoint, 500, id, count || 0 + 1);
                    else
                        return;

                var parent = document.getElementById(id);
                var source = parent.textContent;
                
                parent.innerHTML = "";

                RunKit.createNotebook({
                    element: parent,
                    nodeVersion: "8.x.x",
                    source: source,
                    mode: "endpoint"
                });
            }
            
            function escapeCode(code) {
              return code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            }
        }
    }
}