import tm from 'markdown-it-texmath'
import MarkdownIt from 'markdown-it'
import katex from 'katex'

function render(str) {
  const md = MarkdownIt()
  md.use(tm, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: {
      macros: {
        "\\RR": "\\mathbb{R}"
      }
    }
  })
  return md.render(str)
}

export default render