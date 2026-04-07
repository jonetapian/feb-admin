# Dashboard Component

## Dependências Necessárias

Para usar o componente Dashboard, instale as seguintes dependências:

```bash
npm install ng2-charts chart.js
```

## Funcionalidades

O Dashboard inclui:

- **KPIs principais**: Receita total, vendas, itens vendidos e ticket médio
- **Gráfico de vendas**: Linha mostrando vendas por período
- **Top produtos**: Gráfico pizza dos produtos mais vendidos
- **Alertas**: Produtos com estoque baixo e produtos sem venda
- **Comparação**: Crescimento percentual vs período anterior
- **Filtros**: Seleção de datas com botões rápidos

## Endpoints Utilizados

Certifique-se de que o backend NestJS tenha os seguintes endpoints implementados:

- `GET /dashboard/kpis` - Indicadores principais
- `GET /dashboard/sales-by-date` - Vendas por data
- `GET /dashboard/top-products` - Top produtos
- `GET /dashboard/slow-products` - Produtos sem venda
- `GET /dashboard/low-stock` - Estoque baixo
- `GET /dashboard/comparison` - Comparação de períodos

## Uso

Acesse via `/dashboard` no navegador. O componente carrega automaticamente os dados dos últimos 30 dias.