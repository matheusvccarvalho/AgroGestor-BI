document.addEventListener('DOMContentLoaded', () => {
    const API_PROPRIEDADES = '/api/propriedades';
    const API_SAFRAS = '/api/safras';
    const API_CUSTOS = '/api/custos';
    const API_DASHBOARD = '/api/dashboard';
    
    // ================= ELEMENTOS DO DOM =================
    // Dashboard
    const secaoDashboard = document.getElementById('secao-dashboard');
    const dashboardError = document.getElementById('dashboard-error');
    const dashboardErrorText = document.getElementById('dashboard-error-text');
    const kpiPropriedades = document.getElementById('kpi-propriedades');
    const kpiSafras = document.getElementById('kpi-safras');
    const kpiCustos = document.getElementById('kpi-custos');
    const kpiValorTotal = document.getElementById('kpi-valor-total');
    const filtroSafraDashboard = document.getElementById('filtro-safra-dashboard');
    const emptyCategorias = document.getElementById('empty-categorias');
    const emptyRankingSafras = document.getElementById('empty-safras');
    const emptyEvolucao = document.getElementById('empty-evolucao');
    
    // Propriedades
    const secaoPropriedades = document.getElementById('secao-propriedades');
    const tabelaPropriedades = document.getElementById('tabela-propriedades');
    const tabelaPropriedadesBody = document.getElementById('tabela-propriedades-body');
    const loadingPropriedades = document.getElementById('loading-propriedades');
    const emptyPropriedades = document.getElementById('empty-propriedades');
    const errorPropriedades = document.getElementById('error-propriedades');
    const errorPropriedadesText = document.getElementById('error-propriedades-text');
    
    // Safras
    const secaoSafras = document.getElementById('secao-safras');
    const tabelaSafras = document.getElementById('tabela-safras');
    const tabelaSafrasBody = document.getElementById('tabela-safras-body');
    const loadingSafras = document.getElementById('loading-safras');
    const emptySafras = document.getElementById('empty-safras');
    const errorSafras = document.getElementById('error-safras');
    const errorSafrasText = document.getElementById('error-safras-text');

    // Custos
    const secaoCustos = document.getElementById('secao-custos');
    const tabelaCustos = document.getElementById('tabela-custos');
    const tabelaCustosBody = document.getElementById('tabela-custos-body');
    const tabelaCustosFooter = document.getElementById('tabela-custos-footer');
    const totalCustosValor = document.getElementById('total-custos-valor');
    const loadingCustos = document.getElementById('loading-custos');
    const emptyCustos = document.getElementById('empty-custos');
    const errorCustos = document.getElementById('error-custos');
    const errorCustosText = document.getElementById('error-custos-text');
    const filtroSafraCustos = document.getElementById('filtro-safra-custos');
    
    // Modais - Propriedade
    const modalPropriedade = document.getElementById('modal-propriedade');
    const tituloModalPropriedade = document.getElementById('titulo-modal-propriedade');
    const btnSalvarPropriedade = document.getElementById('btn-salvar-propriedade');
    const formPropriedade = document.getElementById('form-propriedade');
    const formErrorsPropriedade = document.getElementById('form-errors-propriedade');
    const inputPropriedadeId = document.getElementById('propriedade-id');
    
    // Modais - Safra
    const modalSafra = document.getElementById('modal-safra');
    const tituloModalSafra = document.getElementById('titulo-modal-safra');
    const btnSalvarSafra = document.getElementById('btn-salvar-safra');
    const formSafra = document.getElementById('form-safra');
    const formErrorsSafra = document.getElementById('form-errors-safra');
    const selectPropriedade = document.getElementById('safra-propriedade');
    const inputSafraId = document.getElementById('safra-id');
    
    // Modais - Custo
    const modalCusto = document.getElementById('modal-custo');
    const tituloModalCusto = document.getElementById('titulo-modal-custo');
    const formCusto = document.getElementById('form-custo');
    const formErrorsCusto = document.getElementById('form-errors-custo');
    const selectSafraCusto = document.getElementById('custo-safra');
    
    const toast = document.getElementById('toast');

    // ================= ESTADO GLOBAL =================
    let propriedadesCache = [];
    let safrasCache = [];
    
    let graficoCategorias = null;
    let graficoSafra = null;
    let graficoEvolucao = null;
    
    const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const formatadorNumero = new Intl.NumberFormat('pt-BR');

    // ================= INICIALIZAÇÃO =================
    carregarDashboard();
    carregarPropriedades();
    carregarSafras();
    carregarCustos();

    // ================= NAVEGAÇÃO =================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;
            
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            secaoDashboard.classList.add('hidden');
            secaoPropriedades.classList.add('hidden');
            secaoSafras.classList.add('hidden');
            secaoCustos.classList.add('hidden');
            
            if (tab === 'dashboard') {
                secaoDashboard.classList.remove('hidden');
                carregarDashboard();
            } else if (tab === 'propriedades') {
                secaoPropriedades.classList.remove('hidden');
            } else if (tab === 'safras') {
                secaoSafras.classList.remove('hidden');
            } else if (tab === 'custos') {
                secaoCustos.classList.remove('hidden');
            }
        });
    });

    // ================= EVENT LISTENERS =================
    document.getElementById('btn-nova-propriedade').addEventListener('click', () => abrirModalPropriedade());
    document.getElementById('btn-primeira-propriedade').addEventListener('click', () => abrirModalPropriedade());
    formPropriedade.addEventListener('submit', async (e) => { e.preventDefault(); await salvarPropriedade(); });

    document.getElementById('btn-nova-safra').addEventListener('click', async () => { await abrirModalSafra(); });
    document.getElementById('btn-primeira-safra').addEventListener('click', async () => { await abrirModalSafra(); });
    formSafra.addEventListener('submit', async (e) => { e.preventDefault(); await salvarSafra(); });

    document.getElementById('btn-novo-custo').addEventListener('click', async () => { await abrirModalCusto(); });
    formCusto.addEventListener('submit', async (e) => { e.preventDefault(); await salvarCusto(); });
    filtroSafraCustos.addEventListener('change', () => { carregarCustos(filtroSafraCustos.value); });

    filtroSafraDashboard.addEventListener('change', () => { carregarGraficoCategorias(); });

    document.querySelectorAll('.btn-fechar-modal, .btn-cancelar').forEach(btn => {
        btn.addEventListener('click', () => {
            modalPropriedade.close();
            modalSafra.close();
            modalCusto.close();
        });
    });

    // ================= FUNÇÕES DASHBOARD =================
    async function carregarDashboard() {
        try {
            const [resumo, categorias, safras, evolucao] = await Promise.all([
                fetch(`${API_DASHBOARD}/resumo`).then(r => r.ok ? r.json() : Promise.reject('Erro no resumo')),
                fetch(`${API_DASHBOARD}/custos-por-categoria`).then(r => r.ok ? r.json() : Promise.reject('Erro em categorias')),
                fetch(`${API_DASHBOARD}/custos-por-safra`).then(r => r.ok ? r.json() : Promise.reject('Erro em safras')),
                fetch(`${API_DASHBOARD}/evolucao-mensal`).then(r => r.ok ? r.json() : Promise.reject('Erro em evolução'))
            ]);

            kpiPropriedades.textContent = formatadorNumero.format(resumo.totalPropriedades);
            kpiSafras.textContent = formatadorNumero.format(resumo.totalSafras);
            kpiCustos.textContent = formatadorNumero.format(resumo.totalCustos);
            kpiValorTotal.textContent = formatadorMoeda.format(resumo.valorTotalCustos || 0);

            popularFiltroSafraDashboard(safras);
            renderizarGraficoCategorias(categorias);
            renderizarGraficoSafra(safras);
            renderizarGraficoEvolucao(evolucao);

            dashboardError.classList.add('hidden');
        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
            dashboardErrorText.textContent = 'Não foi possível carregar os dados do dashboard. Verifique se a aplicação está rodando.';
            dashboardError.classList.remove('hidden');
        }
    }

    function popularFiltroSafraDashboard(safras) {
        const valorAtual = filtroSafraDashboard.value;
        filtroSafraDashboard.innerHTML = '<option value="">Todas as safras</option>';
        
        safras.forEach(safra => {
            const opt = document.createElement('option');
            opt.value = safra.safraId;
            opt.textContent = safra.descricaoSafra;
            filtroSafraDashboard.appendChild(opt);
        });
        
        if (valorAtual && Array.from(filtroSafraDashboard.options).some(o => o.value === valorAtual)) {
            filtroSafraDashboard.value = valorAtual;
        }
    }

    async function carregarGraficoCategorias() {
        try {
            const safraId = filtroSafraDashboard.value;
            const url = safraId ? `${API_DASHBOARD}/custos-por-categoria?safraId=${safraId}` : `${API_DASHBOARD}/custos-por-categoria`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro ao carregar categorias');
            const dados = await response.json();
            renderizarGraficoCategorias(dados);
        } catch (error) {
            console.error('Erro ao recarregar gráfico de categorias:', error);
        }
    }

    function renderizarGraficoCategorias(dados) {
        const canvas = document.getElementById('grafico-categorias');
        const ctx = canvas.getContext('2d');

        if (graficoCategorias) {
            graficoCategorias.destroy();
            graficoCategorias = null;
        }

        if (!dados || dados.length === 0) {
            emptyCategorias.classList.remove('hidden');
            canvas.style.display = 'none';
            return;
        }

        emptyCategorias.classList.add('hidden');
        canvas.style.display = 'block';

        const labels = dados.map(d => d.categoria);
        const valores = dados.map(d => d.valorTotal);
        
        const cores = ['#246B45', '#1E5A3A', '#3A8F61', '#52B07A', '#7BC99E', '#0F4C30', '#16603D', '#2D7A54'];

        graficoCategorias = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: valores,
                    backgroundColor: cores.slice(0, labels.length),
                    borderWidth: 1,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, usePointStyle: true, font: { size: 12, family: 'Inter, sans-serif' } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const valor = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentual = ((valor / total) * 100).toFixed(1);
                                return `${context.label}: ${formatadorMoeda.format(valor)} (${percentual}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    function renderizarGraficoSafra(dados) {
        const canvas = document.getElementById('grafico-safras');
        const ctx = canvas.getContext('2d');

        if (graficoSafra) {
            graficoSafra.destroy();
            graficoSafra = null;
        }

        if (!dados || dados.length === 0) {
            emptyRankingSafras.classList.remove('hidden');
            canvas.style.display = 'none';
            return;
        }

        emptyRankingSafras.classList.add('hidden');
        canvas.style.display = 'block';

        const dadosOrdenados = [...dados].sort((a, b) => b.valorTotal - a.valorTotal);
        const labels = dadosOrdenados.map(d => d.descricaoSafra);
        const valores = dadosOrdenados.map(d => d.valorTotal);

        graficoSafra = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Custo Total (R$)',
                    data: valores,
                    backgroundColor: '#246B45',
                    borderRadius: 4,
                    barPercentage: 0.6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return formatadorMoeda.format(context.parsed.x);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return 'R$ ' + formatadorNumero.format(value); },
                            font: { size: 11, family: 'Inter, sans-serif' }
                        },
                        grid: { color: '#E8E6E1' }
                    },
                    y: {
                        ticks: { font: { size: 11, family: 'Inter, sans-serif' } },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    function renderizarGraficoEvolucao(dados) {
        const canvas = document.getElementById('grafico-evolucao');
        const ctx = canvas.getContext('2d');

        if (graficoEvolucao) {
            graficoEvolucao.destroy();
            graficoEvolucao = null;
        }

        if (!dados || dados.length === 0) {
            emptyEvolucao.classList.remove('hidden');
            canvas.style.display = 'none';
            return;
        }

        emptyEvolucao.classList.add('hidden');
        canvas.style.display = 'block';

        const labels = dados.map(d => d.mesAno);
        const valores = dados.map(d => d.valorTotal);

        graficoEvolucao = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Custos Mensais (R$)',
                    data: valores,
                    borderColor: '#246B45',
                    backgroundColor: 'rgba(36, 107, 69, 0.08)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 4,
                    pointBackgroundColor: '#246B45',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return formatadorMoeda.format(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { font: { size: 11, family: 'Inter, sans-serif' } },
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return 'R$ ' + formatadorNumero.format(value); },
                            font: { size: 11, family: 'Inter, sans-serif' }
                        },
                        grid: { color: '#E8E6E1' }
                    }
                }
            }
        });
    }

    // ================= FUNÇÕES PROPRIEDADES =================
    async function carregarPropriedades() {
        mostrarEstadoPropriedades('loading');
        try {
            const response = await fetch(API_PROPRIEDADES);
            if (!response.ok) throw new Error('Falha ao carregar dados');
            propriedadesCache = await response.json();
            popularSelectPropriedades();
            if (propriedadesCache.length === 0) mostrarEstadoPropriedades('empty');
            else { renderizarTabelaPropriedades(propriedadesCache); mostrarEstadoPropriedades('table'); }
        } catch (error) {
            errorPropriedadesText.textContent = 'Não foi possível conectar ao servidor.';
            mostrarEstadoPropriedades('error');
        }
    }

    function popularSelectPropriedades() {
        selectPropriedade.innerHTML = '<option value="">Selecione uma propriedade...</option>';
        propriedadesCache.forEach(prop => {
            const opt = document.createElement('option');
            opt.value = prop.id;
            opt.textContent = `${prop.nome} (${prop.areaHectares} ha)`;
            selectPropriedade.appendChild(opt);
        });
    }

    function renderizarTabelaPropriedades(propriedades) {
        tabelaPropriedadesBody.innerHTML = '';
        propriedades.forEach(prop => {
            const tr = document.createElement('tr');
            const areaFormatada = parseFloat(prop.areaHectares).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            const dataFormatada = prop.createdAt ? new Date(prop.createdAt).toLocaleDateString('pt-BR') : '-';
            const localizacao = prop.municipio && prop.estado ? `${prop.municipio} / ${prop.estado}` : (prop.municipio || prop.estado || '-');
            tr.innerHTML = `
                <td>#${prop.id}</td>
                <td><strong>${escapeHtml(prop.nome)}</strong></td>
                <td>${escapeHtml(localizacao)}</td>
                <td>${areaFormatada} ha</td>
                <td>${dataFormatada}</td>
                <td>
                    <button class="btn btn-secondary btn-editar-propriedade" data-id="${prop.id}" style="padding: 6px 10px; font-size: 12px;">Editar</button>
                </td>
            `;
            tabelaPropriedadesBody.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar-propriedade').forEach(btn => {
            btn.addEventListener('click', () => editarPropriedade(btn.dataset.id));
        });
    }

    async function editarPropriedade(id) {
        const propriedade = propriedadesCache.find(p => p.id == id);
        if (!propriedade) {
            mostrarToast('Propriedade não encontrada.', true);
            return;
        }
        abrirModalPropriedade(propriedade);
    }

    function abrirModalPropriedade(propriedadeExistente = null) {
        formPropriedade.reset(); 
        formErrorsPropriedade.classList.add('hidden'); 
        formErrorsPropriedade.innerHTML = '';
        
        if (propriedadeExistente) {
            tituloModalPropriedade.textContent = 'Editar propriedade';
            btnSalvarPropriedade.textContent = 'Atualizar';
            inputPropriedadeId.value = propriedadeExistente.id;
            document.getElementById('prop-nome').value = propriedadeExistente.nome || '';
            document.getElementById('prop-municipio').value = propriedadeExistente.municipio || '';
            document.getElementById('prop-estado').value = propriedadeExistente.estado || '';
            document.getElementById('prop-area').value = propriedadeExistente.areaHectares || '';
        } else {
            tituloModalPropriedade.textContent = 'Nova propriedade';
            btnSalvarPropriedade.textContent = 'Salvar';
            inputPropriedadeId.value = '';
        }
        
        modalPropriedade.showModal();
    }

    async function salvarPropriedade() {
        const submitBtn = formPropriedade.querySelector('button[type="submit"]');
        submitBtn.disabled = true; 
        submitBtn.textContent = 'Salvando...'; 
        formErrorsPropriedade.classList.add('hidden');
        
        const propriedadeId = inputPropriedadeId.value;
        const payload = {
            nome: document.getElementById('prop-nome').value.trim(),
            municipio: document.getElementById('prop-municipio').value.trim() || null,
            estado: document.getElementById('prop-estado').value.trim().toUpperCase() || null,
            areaHectares: parseFloat(document.getElementById('prop-area').value)
        };
        
        try {
            const method = propriedadeId ? 'PUT' : 'POST';
            const url = propriedadeId ? `${API_PROPRIEDADES}/${propriedadeId}` : API_PROPRIEDADES;
            
            const response = await fetch(url, { 
                method, 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payload) 
            });
            if (!response.ok) { 
                const erro = await response.json().catch(() => ({})); 
                throw { status: response.status, data: erro }; 
            }
            
            modalPropriedade.close(); 
            mostrarToast(propriedadeId ? 'Propriedade atualizada com sucesso!' : 'Propriedade cadastrada com sucesso!'); 
            carregarPropriedades();
        } catch (error) {
            if (error.status === 400 && error.data && error.data.erros) {
                formErrorsPropriedade.innerHTML = `<strong>Corrija os campos abaixo:</strong><ul>${error.data.erros.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`;
                formErrorsPropriedade.classList.remove('hidden');
            } else { 
                mostrarToast('Erro ao salvar. Tente novamente.', true); 
            }
        } finally { 
            submitBtn.disabled = false; 
            submitBtn.textContent = propriedadeId ? 'Atualizar' : 'Salvar'; 
        }
    }

    // ================= FUNÇÕES SAFRAS =================
    async function carregarSafras() {
        mostrarEstadoSafras('loading');
        try {
            const response = await fetch(API_SAFRAS);
            if (!response.ok) throw new Error('Falha ao carregar dados');
            safrasCache = await response.json();
            popularSelectSafras();
            if (safrasCache.length === 0) mostrarEstadoSafras('empty');
            else { renderizarTabelaSafras(safrasCache); mostrarEstadoSafras('table'); }
        } catch (error) {
            errorSafrasText.textContent = 'Não foi possível conectar ao servidor.';
            mostrarEstadoSafras('error');
        }
    }

    function popularSelectSafras() {
        const selectFiltro = document.getElementById('filtro-safra-custos');
        const selectModal = document.getElementById('custo-safra');
        
        selectFiltro.innerHTML = '<option value="">Todas as safras</option>';
        selectModal.innerHTML = '<option value="">Selecione uma safra</option>';
        
        safrasCache.forEach(safra => {
            const texto = `${safra.cultura} ${safra.periodo} - ${safra.propriedadeNome}`;
            
            const optFiltro = document.createElement('option');
            optFiltro.value = safra.id;
            optFiltro.textContent = texto;
            selectFiltro.appendChild(optFiltro);
            
            const optModal = document.createElement('option');
            optModal.value = safra.id;
            optModal.textContent = texto;
            selectModal.appendChild(optModal);
        });
    }

    function renderizarTabelaSafras(safras) {
        tabelaSafrasBody.innerHTML = '';
        safras.forEach(safra => {
            const tr = document.createElement('tr');
            const areaFormatada = parseFloat(safra.areaPlantada).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            const produtividadeFormatada = safra.produtividadeEstimada ? parseFloat(safra.produtividadeEstimada).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-';
            const producaoFormatada = safra.producaoEstimada ? parseFloat(safra.producaoEstimada).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-';
            const custoFormatado = safra.custoPorHectare ? `R$ ${parseFloat(safra.custoPorHectare).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-';
            
            tr.innerHTML = `
                <td>#${safra.id}</td>
                <td>${escapeHtml(safra.propriedadeNome)}</td>
                <td><strong>${escapeHtml(safra.cultura)}</strong></td>
                <td>${escapeHtml(safra.periodo)}</td>
                <td>${areaFormatada}</td>
                <td>${produtividadeFormatada}</td>
                <td>${producaoFormatada}</td>
                <td>${custoFormatado}</td>
                <td>
                    <button class="btn btn-secondary btn-editar-safra" data-id="${safra.id}" style="padding: 6px 10px; font-size: 12px;">Editar</button>
                </td>
            `;
            tabelaSafrasBody.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar-safra').forEach(btn => {
            btn.addEventListener('click', () => editarSafra(btn.dataset.id));
        });
    }

    async function editarSafra(id) {
        const safra = safrasCache.find(s => s.id == id);
        if (!safra) {
            mostrarToast('Safra não encontrada.', true);
            return;
        }
        await abrirModalSafra(safra);
    }

    async function abrirModalSafra(safraExistente = null) {
        formSafra.reset(); 
        formErrorsSafra.classList.add('hidden'); 
        formErrorsSafra.innerHTML = '';
        selectPropriedade.disabled = false;
        
        if (propriedadesCache.length === 0) await carregarPropriedades();
        popularSelectPropriedades();
        
        if (propriedadesCache.length === 0) {
            selectPropriedade.disabled = true; 
            mostrarToast('Cadastre uma propriedade primeiro.', true); 
            return;
        }

        if (safraExistente) {
            tituloModalSafra.textContent = 'Editar safra';
            btnSalvarSafra.textContent = 'Atualizar';
            inputSafraId.value = safraExistente.id;
            selectPropriedade.value = safraExistente.propriedadeId;
            document.getElementById('safra-cultura').value = safraExistente.cultura || '';
            document.getElementById('safra-periodo').value = safraExistente.periodo || '';
            document.getElementById('safra-area-plantada').value = safraExistente.areaPlantada || '';
            document.getElementById('safra-produtividade').value = safraExistente.produtividadeEstimada || '';
            document.getElementById('safra-custo').value = safraExistente.custoPorHectare || '';
        } else {
            tituloModalSafra.textContent = 'Nova safra';
            btnSalvarSafra.textContent = 'Salvar';
            inputSafraId.value = '';
        }
        
        modalSafra.showModal();
    }

    async function salvarSafra() {
        const submitBtn = formSafra.querySelector('button[type="submit"]');
        submitBtn.disabled = true; 
        submitBtn.textContent = 'Salvando...'; 
        formErrorsSafra.classList.add('hidden');
        
        const safraId = inputSafraId.value;
        const payload = {
            propriedadeId: parseInt(formSafra.propriedadeId.value),
            cultura: formSafra.cultura.value.trim(), 
            periodo: formSafra.periodo.value.trim(),
            areaPlantada: parseFloat(formSafra.areaPlantada.value),
            produtividadeEstimada: formSafra.produtividadeEstimada.value ? parseFloat(formSafra.produtividadeEstimada.value) : null,
            custoPorHectare: formSafra.custoPorHectare.value ? parseFloat(formSafra.custoPorHectare.value) : null
        };
        
        try {
            const method = safraId ? 'PUT' : 'POST';
            const url = safraId ? `${API_SAFRAS}/${safraId}` : API_SAFRAS;
            
            const response = await fetch(url, { 
                method, 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payload) 
            });
            if (!response.ok) { 
                const erro = await response.json().catch(() => ({})); 
                throw { status: response.status, data: erro }; 
            }
            
            modalSafra.close(); 
            mostrarToast(safraId ? 'Safra atualizada com sucesso!' : 'Safra cadastrada com sucesso!'); 
            carregarSafras();
        } catch (error) {
            if (error.status === 400 && error.data && error.data.erros) {
                formErrorsSafra.innerHTML = `<strong>Corrija os campos abaixo:</strong><ul>${error.data.erros.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`;
                formErrorsSafra.classList.remove('hidden');
            } else if (error.status === 404 && error.data && error.data.mensagem) {
                formErrorsSafra.innerHTML = `<strong>${escapeHtml(error.data.mensagem)}</strong>`; 
                formErrorsSafra.classList.remove('hidden');
            } else { 
                mostrarToast('Erro ao salvar. Tente novamente.', true); 
            }
        } finally { 
            submitBtn.disabled = false; 
            submitBtn.textContent = safraId ? 'Atualizar' : 'Salvar'; 
        }
    }

    // ================= FUNÇÕES CUSTOS =================
    async function carregarCustos(safraId = null) {
        mostrarEstadoCustos('loading');
        try {
            const url = safraId ? `${API_CUSTOS}/safra/${safraId}` : API_CUSTOS;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Falha ao carregar dados');
            const custos = await response.json();
            
            if (custos.length === 0) {
                mostrarEstadoCustos('empty');
            } else {
                renderizarTabelaCustos(custos);
                mostrarEstadoCustos('table');
            }
        } catch (error) {
            errorCustosText.textContent = 'Não foi possível conectar ao servidor.';
            mostrarEstadoCustos('error');
        }
    }

    function renderizarTabelaCustos(custos) {
        tabelaCustosBody.innerHTML = '';
        let totalDespesas = 0;

        custos.forEach(custo => {
            totalDespesas += parseFloat(custo.valor);
            const tr = document.createElement('tr');
            const dataFormatada = custo.dataLancamento ? new Date(custo.dataLancamento + 'T00:00:00').toLocaleDateString('pt-BR') : '-';
            const valorFormatado = formatadorMoeda.format(custo.valor);

            tr.innerHTML = `
                <td>#${custo.id}</td>
                <td>${escapeHtml(custo.safraDescricao)}</td>
                <td><span style="background-color: var(--accent-soft); color: var(--accent-text); padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">${escapeHtml(custo.categoria)}</span></td>
                <td>${escapeHtml(custo.descricao)}</td>
                <td>${dataFormatada}</td>
                <td style="text-align: right; font-weight: 500;">${valorFormatado}</td>
                <td>
                    <button class="btn btn-secondary btn-editar-custo" data-id="${custo.id}" style="padding: 6px 10px; font-size: 12px; margin-right: 4px;">Editar</button>
                    <button class="btn btn-secondary btn-excluir-custo" data-id="${custo.id}" style="padding: 6px 10px; font-size: 12px; color: var(--error); border-color: var(--error-border);">Excluir</button>
                </td>
            `;
            tabelaCustosBody.appendChild(tr);
        });

        totalCustosValor.textContent = formatadorMoeda.format(totalDespesas);
        tabelaCustosFooter.classList.remove('hidden');

        document.querySelectorAll('.btn-editar-custo').forEach(btn => {
            btn.addEventListener('click', () => editarCusto(btn.dataset.id));
        });
        document.querySelectorAll('.btn-excluir-custo').forEach(btn => {
            btn.addEventListener('click', () => excluirCusto(btn.dataset.id));
        });
    }

    async function abrirModalCusto(custoExistente = null) {
        formCusto.reset(); 
        formErrorsCusto.classList.add('hidden'); 
        formErrorsCusto.innerHTML = '';
        selectSafraCusto.disabled = false;

        if (safrasCache.length === 0) await carregarSafras();
        popularSelectSafras();

        if (safrasCache.length === 0) {
            selectSafraCusto.disabled = true; 
            mostrarToast('Cadastre uma safra primeiro.', true); 
            return;
        }

        if (custoExistente) {
            tituloModalCusto.textContent = 'Editar custo';
            document.getElementById('custo-id').value = custoExistente.id;
            selectSafraCusto.value = custoExistente.safraId;
            document.getElementById('custo-categoria').value = custoExistente.categoria;
            document.getElementById('custo-descricao').value = custoExistente.descricao;
            document.getElementById('custo-valor').value = custoExistente.valor;
            if (custoExistente.dataLancamento) {
                document.getElementById('custo-data').value = custoExistente.dataLancamento;
            }
        } else {
            tituloModalCusto.textContent = 'Novo custo';
            document.getElementById('custo-id').value = '';
            document.getElementById('custo-data').valueAsDate = new Date();
        }
        modalCusto.showModal();
    }

    async function salvarCusto() {
        const submitBtn = formCusto.querySelector('button[type="submit"]');
        submitBtn.disabled = true; 
        submitBtn.textContent = 'Salvando...'; 
        formErrorsCusto.classList.add('hidden');
        
        const custoId = document.getElementById('custo-id').value;
        const payload = {
            safraId: parseInt(selectSafraCusto.value),
            categoria: document.getElementById('custo-categoria').value.trim(),
            descricao: document.getElementById('custo-descricao').value.trim(),
            valor: parseFloat(document.getElementById('custo-valor').value),
            dataLancamento: document.getElementById('custo-data').value || null
        };

        try {
            const method = custoId ? 'PUT' : 'POST';
            const url = custoId ? `${API_CUSTOS}/${custoId}` : API_CUSTOS;
            
            const response = await fetch(url, { 
                method, 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payload) 
            });
            if (!response.ok) { 
                const erro = await response.json().catch(() => ({})); 
                throw { status: response.status, data: erro }; 
            }
            
            modalCusto.close(); 
            mostrarToast(custoId ? 'Custo atualizado com sucesso!' : 'Custo cadastrado com sucesso!'); 
            carregarCustos(filtroSafraCustos.value);
        } catch (error) {
            if (error.status === 400 && error.data && error.data.erros) {
                formErrorsCusto.innerHTML = `<strong>Corrija os campos abaixo:</strong><ul>${error.data.erros.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`;
                formErrorsCusto.classList.remove('hidden');
            } else if (error.status === 404 && error.data && error.data.mensagem) {
                formErrorsCusto.innerHTML = `<strong>${escapeHtml(error.data.mensagem)}</strong>`; 
                formErrorsCusto.classList.remove('hidden');
            } else { 
                mostrarToast('Erro ao salvar. Tente novamente.', true); 
            }
        } finally { 
            submitBtn.disabled = false; 
            submitBtn.textContent = 'Salvar'; 
        }
    }

    async function editarCusto(id) {
        try {
            const response = await fetch(`${API_CUSTOS}/${id}`);
            if (!response.ok) throw new Error('Falha ao buscar custo');
            const custo = await response.json();
            await abrirModalCusto(custo);
        } catch (error) {
            mostrarToast('Erro ao carregar dados para edição.', true);
        }
    }

    async function excluirCusto(id) {
        if (!confirm('Tem certeza que deseja excluir este custo? Esta ação não pode ser desfeita.')) {
            return;
        }
        try {
            const response = await fetch(`${API_CUSTOS}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Falha ao excluir');
            mostrarToast('Custo excluído com sucesso!');
            carregarCustos(filtroSafraCustos.value);
        } catch (error) {
            mostrarToast('Erro ao excluir custo.', true);
        }
    }

    // ================= FUNÇÕES UTILITÁRIAS =================
    function mostrarEstadoPropriedades(estado) {
        loadingPropriedades.classList.add('hidden'); 
        emptyPropriedades.classList.add('hidden');
        errorPropriedades.classList.add('hidden'); 
        tabelaPropriedades.classList.add('hidden');
        if (estado === 'loading') loadingPropriedades.classList.remove('hidden');
        else if (estado === 'empty') emptyPropriedades.classList.remove('hidden');
        else if (estado === 'error') errorPropriedades.classList.remove('hidden');
        else if (estado === 'table') tabelaPropriedades.classList.remove('hidden');
    }

    function mostrarEstadoSafras(estado) {
        loadingSafras.classList.add('hidden'); 
        emptySafras.classList.add('hidden');
        errorSafras.classList.add('hidden'); 
        tabelaSafras.classList.add('hidden');
        if (estado === 'loading') loadingSafras.classList.remove('hidden');
        else if (estado === 'empty') emptySafras.classList.remove('hidden');
        else if (estado === 'error') errorSafras.classList.remove('hidden');
        else if (estado === 'table') tabelaSafras.classList.remove('hidden');
    }

    function mostrarEstadoCustos(estado) {
        loadingCustos.classList.add('hidden'); 
        emptyCustos.classList.add('hidden');
        errorCustos.classList.add('hidden'); 
        tabelaCustos.classList.add('hidden');
        tabelaCustosFooter.classList.add('hidden');
        if (estado === 'loading') loadingCustos.classList.remove('hidden');
        else if (estado === 'empty') emptyCustos.classList.remove('hidden');
        else if (estado === 'error') errorCustos.classList.remove('hidden');
        else if (estado === 'table') { 
            tabelaCustos.classList.remove('hidden'); 
        }
    }

    function mostrarToast(mensagem, isError = false) {
        toast.textContent = mensagem;
        toast.className = `toast ${isError ? 'error' : ''}`;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4000);
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});