import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  
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
              <Link 
                to="/login"
                className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10 inline-block"
              >
                Area do Cliente
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-16">
              <Shield className="w-12 h-12 text-amber-500 mx-auto mb-6" />
              <h1 className="text-4xl font-serif text-zinc-900 mb-4">Política de Privacidade</h1>
              <p className="text-stone-500 font-light text-lg">
                Última atualização: 24 de Maio de 2024
              </p>
           </div>

           <div className="prose prose-stone prose-lg">
              <p className="text-stone-600 font-light leading-relaxed mb-8">
                No Perfect Salon, a privacidade e a segurança dos dados do seu salão e dos seus clientes são nossa prioridade absoluta. Esta política descreve como coletamos, usamos e protegemos suas informações.
              </p>

              <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-stone-400" />
                Coleta de Dados
              </h3>
              <p className="text-stone-600 font-light mb-4">
                Coletamos informações necessárias para a prestação dos nossos serviços de agendamento e gestão:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-600 font-light mb-8">
                <li>Dados de cadastro do estabelecimento (CNPJ, Endereço, Responsável).</li>
                <li>Informações de profissionais parceiros para sincronização de agendas.</li>
                <li>Dados de clientes finais (Nome, Telefone) estritamente para fins de agendamento.</li>
              </ul>

              <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-stone-400" />
                Uso das Informações
              </h3>
              <p className="text-stone-600 font-light mb-8">
                Utilizamos os dados coletados exclusivamente para operar, manter e melhorar as funcionalidades do Perfect Salon. 
                <strong>Não vendemos, alugamos ou compartilhamos dados de seus clientes com terceiros</strong> para fins de marketing.
              </p>

              <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-stone-400" />
                Segurança e Armazenamento
              </h3>
              <p className="text-stone-600 font-light mb-8">
                Empregamos padrões de segurança de nível bancário, incluindo criptografia SSL em todas as transmissões de dados e armazenamento seguro em servidores certificados (AWS/Google Cloud). As chaves de API do Google Calendar e WhatsApp são armazenadas de forma criptografada.
              </p>

              <h3 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Seus Direitos</h3>
              <p className="text-stone-600 font-light mb-8">
                Você tem o direito de solicitar a exportação ou exclusão completa dos seus dados a qualquer momento, conforme previsto na LGPD (Lei Geral de Proteção de Dados). Para exercer esses direitos, entre em contato com nosso encarregado de dados.
              </p>
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
               <Link to="/privacy" className="hover:text-white transition-colors text-white font-bold">Privacidade</Link>
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

export default PrivacyPage;