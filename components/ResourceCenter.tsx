import React, { useState } from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { RevealOnScroll } from './RevealOnScroll';
import {
    ArrowRight,
    BookOpen,
    Download,
    PlayCircle,
    ArrowLeft,
    Share2,
    Search,
    Tag,
    ChevronRight,
    Clock
} from 'lucide-react';

// Types
type ResourceCategory = 'Todos' | 'Bienestar' | 'Liderazgo' | 'Productividad' | 'Cultura';

interface Resource {
    id: string;
    title: string;
    category: ResourceCategory;
    type: 'Guide' | 'Article' | 'Video' | 'Tool';
    image: string;
    description: string;
    readTime?: string;
    content?: React.ReactNode;
}

// Mock Data
const resources: Resource[] = [
    {
        id: 'new-1',
        title: 'Cuatro Niveles de Compromiso',
        category: 'Cultura',
        type: 'Article',
        image: '/images/engagement-curve.png',
        description: 'Desde los que contribuyen mínimamente hasta las superestrellas, comprende el espectro del compromiso laboral.',
        readTime: '5 min lectura',
        content: (
            <div className="space-y-8 text-slate-600 leading-relaxed text-lg">
                <p className="font-medium text-xl text-slate-900 leading-relaxed">
                    Desde aquellos que contribuyen lo mínimo hasta las superestrellas que van más allá, comprender el diverso espectro del compromiso laboral es crucial para el éxito de tu organización. A continuación, un desglose de cada categoría.
                </p>

                <div className="my-12 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
                    <img src="/images/engagement-curve.png" alt="Curva de Compromiso" className="w-full h-auto" />
                    <div className="bg-slate-50 p-4 text-center text-sm text-slate-500 font-medium">
                        La Curva de Compromiso Laboral
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">1. Activamente Desconectados (Actively Disengaged)</h3>
                    <p>
                        Los valores atípicos negativos en el lado izquierdo de la curva son el 5-15% que esencialmente han renunciado, pero olvidaron avisarte. Todavía aparecen y cobran un sueldo, pero hacen la cantidad mínima de trabajo, solo lo suficiente para evitar ser llamados o despedidos. Pueden estar presentes durante ocho horas, pero solo le dan a la empresa unas cuatro horas de trabajo real.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">2. Algo Desconectados (Somewhat Disengaged)</h3>
                    <p>
                        Moviéndose hacia el centro de la curva de campana, la siguiente categoría son los empleados algo desconectados. Este grupo es típicamente el más grande, representando el 35-50 por ciento de los empleados. Estas personas pueden estar ocasionalmente comprometidas, pero no están funcionando a su máximo potencial o cerca de él. La productividad de este grupo es un poco mejor que la de los activamente desconectados; de ocho horas, están poniendo unas cinco horas y cuarto de trabajo durante el día.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">3. Comprometidos (Engaged)</h3>
                    <p>
                        Cruzando el umbral hacia el compromiso en el lado derecho, encontramos a los empleados verdaderamente comprometidos. Este grupo representa el 20-35% de los empleados en una empresa típica; están poniendo un día honesto de trabajo por un día completo de pago. Estos empleados son la sal de la tierra: trabajan duro, es más probable que crean en la misión y visión de la empresa, y su perspectiva tiende a ser más positiva en todo lo que hacen.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">4. Activamente Comprometidos (Actively Engaged)</h3>
                    <p>
                        Los valores atípicos positivos son los empleados activamente comprometidos, representando el 5-15% de los trabajadores en organizaciones típicas. Estos empleados son confiablemente hiperproductivos, dando cerca de un día y medio de trabajo por un día completo de pago. Son embajadores internos y externos de la marca, y creen y trabajan en congruencia con los valores fundamentales de la organización. Es mucho más probable que se sientan realizados, conectados y fieles a la empresa, a su equipo y a su líder.
                    </p>
                </div>

                <div className="bg-[#F2F5F9] p-8 rounded-[2rem] border border-slate-100 my-10">
                    <p className="italic text-slate-700 font-medium text-lg">
                        "Se ha estimado que el 25% de la mayoría de los gastos organizacionales en recursos humanos y beneficios se desperdician debido al desempeño deficiente de los empleados desconectados. Comprender el nivel de pérdida siempre es revelador, y uno de los principales beneficios de medir el compromiso es la claridad que ofrece sobre dónde se necesitan remedios."
                    </p>
                </div>
            </div>
        )
    },
    {
        id: '1',
        title: 'Protocolo de Higiene Digital',
        category: 'Bienestar',
        type: 'Guide',
        image: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?auto=format&fit=crop&q=80',
        description: 'Estrategias prácticas para recuperar tu atención y reducir la fatiga visual en la era del trabajo híbrido.',
        readTime: '5 min lectura'
    },
    {
        id: '2',
        title: 'Liderazgo Empático en Crisis',
        category: 'Liderazgo',
        type: 'Article',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
        description: 'Cómo sostener a tu equipo emocionalmente sin descuidar los objetivos del negocio.',
        readTime: '8 min lectura'
    },
    {
        id: '3',
        title: 'Kit de Primeros Auxilios Emocionales',
        category: 'Bienestar',
        type: 'Tool',
        image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&q=80',
        description: 'Checklist y ejercicios de respiración para momentos de alta tensión laboral.',
        readTime: 'Descargable'
    },
    {
        id: '4',
        title: 'Rituales de Inicio y Cierre',
        category: 'Productividad',
        type: 'Guide',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80',
        description: 'Pequeños hábitos para separar la vida personal de la laboral cuando trabajas desde casa.',
        readTime: '4 min lectura'
    },
    {
        id: '5',
        title: 'Cultura de Feedback Seguro',
        category: 'Cultura',
        type: 'Article',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
        description: 'Creando espacios donde el error es una oportunidad de aprendizaje y no una causa de castigo.',
        readTime: '6 min lectura'
    },
    {
        id: '6',
        title: 'Masterclass: Regulación Nerviosa',
        category: 'Bienestar',
        type: 'Video',
        image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80',
        description: 'Encuentro grabado con nuestros expertos sobre cómo funciona el sistema nervioso bajo estrés.',
        readTime: '25 min video'
    }
];

const categories: ResourceCategory[] = ['Todos', 'Bienestar', 'Liderazgo', 'Productividad', 'Cultura'];

interface ResourceCenterProps {
    onBack: () => void;
}

export const ResourceCenter: React.FC<ResourceCenterProps> = ({ onBack }) => {
    const [activeCategory, setActiveCategory] = useState<ResourceCategory>('Todos');
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter Logic
    const filteredResources = resources.filter(r => {
        const matchesCategory = activeCategory === 'Todos' || r.category === activeCategory;
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Related Resources Logic
    const getRelatedResources = (current: Resource) => {
        return resources
            .filter(r => r.category === current.category && r.id !== current.id)
            .slice(0, 3);
    };

    // --- Article Detail View ---
    if (selectedResource) {
        const relatedResources = getRelatedResources(selectedResource);

        return (
            <div className="min-h-screen bg-white pt-20 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Sticky Top Bar for Article */}
                <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 mb-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Breadcrumbs / Back */}
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 w-full md:w-auto">
                            <button
                                onClick={() => setSelectedResource(null)}
                                className="hover:text-slate-900 transition-colors flex items-center gap-1"
                            >
                                Recursos
                            </button>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 truncate max-w-[200px]">{selectedResource.title}</span>
                        </div>

                        {/* Search & Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar otro artículo..."
                                    className="pl-9 pr-4 py-2 rounded-full bg-slate-100 border-none text-sm focus:ring-2 focus:ring-slate-200 outline-none w-full md:w-64"
                                />
                            </div>
                            <Button variant="primary" className="hidden md:flex">Suscribirse</Button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content Column */}
                    <div className="lg:col-span-8">
                        {/* Article Header */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="bg-[#E9F5DB] text-[#365314] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {selectedResource.category}
                                </span>
                                <span className="flex items-center gap-1 text-slate-400 text-sm font-bold uppercase tracking-wider">
                                    <Clock size={14} />
                                    {selectedResource.readTime}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                {selectedResource.title}
                            </h1>
                        </div>

                        {/* Hero Image */}
                        <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-slate-100 mb-10">
                            <img
                                src={selectedResource.image}
                                alt={selectedResource.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Content */}
                        <article className="prose prose-lg prose-slate max-w-none">
                            {selectedResource.content || (
                                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                    <p className="text-slate-500 italic">Contenido completo próximamente.</p>
                                </div>
                            )}
                        </article>

                        {/* Article Footer */}
                        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
                            <div className="flex gap-2">
                                {['#Cultura', '#Liderazgo', '#HR'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#365314] transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Newsletter Widget */}
                        <div className="bg-[#1e293b] rounded-[2rem] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#365314] rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            <h3 className="text-xl font-bold mb-2 relative z-10">Newsletter Calibre</h3>
                            <p className="text-slate-300 text-sm mb-6 relative z-10">Recibe recursos semanales para potenciar tu equipo.</p>
                            <input
                                type="email"
                                placeholder="Tu email"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#365314] mb-3 relative z-10"
                            />
                            <Button variant="primary" className="w-full bg-[#365314] hover:bg-[#4d7c0f] border-none relative z-10">
                                Suscribirme
                            </Button>
                        </div>

                        {/* Related Articles */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <BookOpen size={18} className="text-[#365314]" />
                                Relacionado en {selectedResource.category}
                            </h3>
                            <div className="space-y-4">
                                {relatedResources.length > 0 ? (
                                    relatedResources.map(related => (
                                        <div
                                            key={related.id}
                                            className="group cursor-pointer flex gap-4 items-start p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                                            onClick={() => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                setSelectedResource(related);
                                            }}
                                        >
                                            <img
                                                src={related.image}
                                                alt={related.title}
                                                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                                            />
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-[#365314] transition-colors">
                                                    {related.title}
                                                </h4>
                                                <span className="text-xs text-slate-400 font-medium">{related.readTime}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm italic">No hay otros artículos relacionados por ahora.</p>
                                )}
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Tag size={18} className="text-[#365314]" />
                                Explorar Temas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.filter(c => c !== 'Todos').map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedResource(null);
                                            setActiveCategory(cat);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold hover:bg-[#E9F5DB] hover:text-[#365314] transition-colors"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // --- Grid View (Default) ---
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            {/* Header */}
            <Section className="pt-10 pb-16">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
                            <BookOpen size={14} />
                            <span>Biblioteca Calibre</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Recursos para <br /> <span className="text-slate-400">Mentes Activas</span>
                        </h1>

                        {/* Main Search */}
                        <div className="max-w-xl mx-auto relative mb-10 group">
                            <div className="absolute inset-0 bg-[#365314] blur-xl opacity-10 rounded-full group-hover:opacity-20 transition-opacity"></div>
                            <div className="relative flex items-center">
                                <Search className="absolute left-5 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="¿Qué estás buscando hoy?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 rounded-full border border-slate-200 shadow-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#365314] focus:border-transparent outline-none text-lg transition-all"
                                />
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Category Filter */}
                    <RevealOnScroll delay={100}>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-slate-900 text-white shadow-lg scale-105'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </Section>

            {/* Resources Grid */}
            <Section className="bg-[#F8FAFC] py-20 rounded-t-[3rem]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map((resource, idx) => (
                            <RevealOnScroll key={resource.id} delay={idx * 100}>
                                <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={resource.image}
                                            alt={resource.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            {resource.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
                                            {resource.type === 'Video' ? <PlayCircle size={14} /> :
                                                resource.type === 'Tool' ? <Download size={14} /> : <BookOpen size={14} />}
                                            <span>{resource.type}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>{resource.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#365314] transition-colors">
                                            {resource.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                            {resource.description}
                                        </p>

                                        <Button
                                            variant="outline"
                                            className="w-full justify-between group-hover:bg-slate-50"
                                            onClick={() => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                setSelectedResource(resource);
                                            }}
                                        >
                                            <span>{resource.content ? 'Leer Artículo' : 'Ver Recurso'}</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    {filteredResources.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 font-medium">No se encontraron recursos que coincidan con tu búsqueda.</p>
                            <button
                                onClick={() => {
                                    setActiveCategory('Todos');
                                    setSearchQuery('');
                                }}
                                className="text-slate-900 font-bold mt-4 hover:underline"
                            >
                                Ver todos los recursos
                            </button>
                        </div>
                    )}
                </div>
            </Section>

            {/* Newsletter / CTA */}
            <Section className="py-20">
                <RevealOnScroll className="max-w-4xl mx-auto bg-[#E9F5DB] rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#365314] mb-4">
                            Mantente Actualizado
                        </h2>
                        <p className="text-[#4d7c0f] font-medium mb-8 max-w-lg mx-auto">
                            Recibe nuestras nuevas guías y herramientas directamente en tu correo. Sin spam, solo contenido de valor.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Tu email corporativo"
                                className="flex-grow px-6 py-3.5 rounded-full bg-white border-none text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#365314] outline-none"
                            />
                            <Button variant="primary" className="bg-[#365314] text-white hover:bg-[#2d4610]">
                                Suscribirse
                            </Button>
                        </div>
                    </div>
                </RevealOnScroll>
            </Section>
        </div>
    );
};
