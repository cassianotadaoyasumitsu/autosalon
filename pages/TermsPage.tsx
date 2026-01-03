import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const TermsPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-serif italic font-bold text-zinc-900 tracking-wide">Perfect Salon</Link>
            </div>
            <div className="hidden md:flex space-x-10">
              <Link to="/features" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Funcionalidades</Link>
              <Link to="/management" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Gestão</Link>
              <Link to="/pricing" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Investimento</Link>
            </div>
            <div>
              <button 
                onClick={login}
                className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10"
              >
                Area do Cliente
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-16">
              <FileText className="w-12 h-12 text-zinc-900 mx-auto mb-6" />
              <h1 className="text-4xl font-serif text-zinc-900 mb-4">Termos de Uso</h1>
              <p className="text-stone-500 font-light text-lg">
                Regras e diretrizes para utilização da plataforma.
              </p>
           </div>

           <div className="space-y-12">
              <section>
                 <h3 className="text-xl font-bold text-zinc-900 mb-4">1. Aceitação dos Termos</h3>
                 <p className="text-stone-600 font-light leading-relaxed">
                   Ao acessar e utilizar o Perfect Salon, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
                 </p>
              </section>

              <section>
                 <h3 className="text-xl font-bold text-zinc-900 mb-4">2. Licença de Uso</h3>
                 <p className="text-stone-600 font-light leading-relaxed mb-4">
                   Concedemos uma licença limitada, não exclusiva e intransferível para uso do software como serviço (SaaS), sujeito ao pagamento das mensalidades acordadas. É proibido:
                 </p>
                 <ul className="space-y-2">
                   {['Modificar ou copiar o código fonte.', 'Utilizar para fins ilegais ou não autorizados.', 'Tentar obter acesso não autorizado aos sistemas.'].map((item, i) => (
                     <li key={i} className="flex items-start text-stone-600 font-light">
                       <AlertCircle className="w-4 h-4 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                       {item}
                     </li>
                   ))}
                 </ul>
              </section>

              <section>
                 <h3 className="text-xl font-bold text-zinc-900 mb-4">3. Pagamentos e Cancelamento</h3>
                 <p className="text-stone-600 font-light leading-relaxed">
                   O serviço é cobrado mensalmente via cartão de crédito ou PIX. O cancelamento pode ser solicitado a qualquer momento sem multa, com a interrupção do serviço ao final do ciclo de faturamento vigente. Não realizamos reembolsos de períodos parciais.
                 </p>
              </section>

              <section>
                 <h3 className="text-xl font-bold text-zinc-900 mb-4">4. Disponibilidade e Suporte</h3>
                 <p className="text-stone-600 font-light leading-relaxed">
                   Esforçamo-nos para manter 99.9% de uptime. No entanto, interrupções programadas para manutenção podem ocorrer. O suporte técnico é oferecido via email e chat em horário comercial (09:00 às 18:00, dias úteis).
                 </p>
              </section>
              
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 mt-8">
                 <p className="text-sm text-stone-500 font-light">
                    Dúvidas sobre os termos? Entre em contato com nossa equipe jurídica através do canal de suporte.
                 </p>
              </div>
           </div>
        </div>
      </div>

       {/* Footer */}
       <footer className="bg-zinc-950 text-stone-400 border-t border-white/5">
        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
               <span className="text-2xl font-serif italic text-white">Perfect Salon</span>
            </div>
            <div className="flex space-x-8 text-xs uppercase tracking-widest">
               <Link to="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
               <Link to="/terms" className="hover:text-white transition-colors">Termos</Link>
               <Link to="/contact" className="hover:text-white transition-colors">Contato</Link>
            </div>
            <div className="mt-8 md:mt-0 text-xs font-light">
              &copy; 2024 Perfect Salon. Excellence in Management.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;