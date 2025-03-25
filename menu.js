// Dados do menu
const menuData = {
    categories: [
        {
            id: 'entradas',
            title: 'Entradas',
            items: [
                {
                    name: 'Sopa de Cebola Gratinada',
                    description: 'Sopa tradicional francesa com queijo gratinado e croutons',
                    price: 'R$ 45,00',
                    tags: []
                }
            ]
        },
        {
            id: 'principais',
            title: 'Pratos Principais',
            items: [
                {
                    name: 'Fondue Savoyarde',
                    description: 'Fondue de queijos com pão e legumes',
                    price: 'R$ 85,00',
                    tags: ['Queijo', 'Vegetariano']
                }
            ]
        },
        {
            id: 'sobremesas',
            title: 'Sobremesas',
            items: [
                {
                    name: 'Crème Brûlée',
                    description: 'Creme de baunilha com caramelo crocante',
                    price: 'R$ 35,00',
                    tags: []
                }
            ]
        },
        {
            id: 'bebidas',
            title: 'Bebidas',
            items: [
                {
                    name: 'Vinho Tinto',
                    description: 'Vinho tinto francês, taça',
                    price: 'R$ 45,00',
                    tags: []
                }
            ]
        }
    ]
};

// Função para criar um item do menu
function createMenuItem(item) {
    return `
        <article class="menu-item">
            <div class="item-info">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description}</p>
                ${item.tags.length > 0 ? `
                    <div class="item-tags">
                        ${item.tags.map(tag => `<span class="item-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            <span class="item-price">${item.price}</span>
        </article>
    `;
}

// Função para criar uma categoria do menu
function createMenuCategory(category) {
    return `
        <section id="${category.id}" class="menu-category" aria-labelledby="${category.id}-title">
            <h2 id="${category.id}-title" class="category-title">${category.title}</h2>
            <div class="menu-items">
                ${category.items.map(createMenuItem).join('')}
            </div>
        </section>
    `;
}

// Função para criar a navegação do menu
function createMenuNav() {
    return `
        <header class="menu-header">
            <nav class="menu-nav" role="navigation" aria-label="Categorias do menu">
                <ul>
                    ${menuData.categories.map(category => `
                        <li><a href="#${category.id}">${category.title}</a></li>
                    `).join('')}
                </ul>
            </nav>
        </header>
    `;
}

// Função para criar o rodapé do menu
function createMenuFooter() {
    return `
        <footer class="menu-footer">
            <p>Preços incluem 10% de serviço</p>
            <p>Consulte nosso cardápio para mais opções</p>
        </footer>
    `;
}

// Função para renderizar todo o menu
function renderMenu() {
    const container = document.getElementById('menu-items-container');
    container.innerHTML = `
        ${createMenuNav()}
        ${menuData.categories.map(createMenuCategory).join('')}
        ${createMenuFooter()}
    `;

    // Adiciona o evento de scroll para atualizar a navegação
    setupScrollNavigation();
}

// Função para configurar a navegação por scroll
function setupScrollNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu-nav a');

    function updateActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.setAttribute('aria-current', '');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// Inicializa o menu quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', renderMenu); 