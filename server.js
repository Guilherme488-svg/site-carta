const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// serve public files
app.use(express.static(path.join(__dirname, 'public')));
// serve uploaded images
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// rota para download do PDF (se existir no root)
app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'carta_rosa_para_minha_pretinha_com_fotos.pdf');
  res.download(file, 'carta_para_minha_pretinha.pdf', err => {
    if (err) console.error('Erro ao enviar PDF:', err);
  });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
