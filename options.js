{
    filters:
    {
        markdown: function (text)
        {
            var marked = require("marked");
            var renderer = new marked.Renderer();
            var prism = require('prismjs');

            renderer.code = function(code, lang, escaped) {

                if (!global.exampleCount)
                    global.exampleCount = 0;

                var out = prism.highlight(code, prism.languages.javascript) || code;
                var escaped = out !== code ? out : escapeCode(out, true);
                var id = "example-" + (global.exampleCount++);
                var script = lang === "runkit-endpoint" ?
                "<script>(" + endpoint + ")(\"" + id + "\")</script>" : "";

                return "<div id = \"" + id + "\"><pre><code>" + escaped + "</code></pre></div>" + script;
            };

            return marked(text, { renderer: renderer });
            
            function endpoint(id, count) {
                if (!window.RunKit)
                    if (count || 0 < 20)
                        return setTimeout(endpoint, 500, id, count || 0 + 1);
                    else
                        return;

                var parent = document.getElementById(id);
                var source = parent.textContent;
                
                parent.innerHTML = "";

                RunKit.createNotebook({
                    element: parent,
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