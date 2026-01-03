import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

interface ContactPageProps {
  onLogin: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onLogin }) => {
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
                onClick={onLogin}
                className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10"
              >
                Area do Cliente
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-16">
              <h1 className="text-4xl font-serif text-zinc-900 mb-4">Entre em Contato</h1>
              <p className="text-stone-500 font-light text-lg max-w-2xl mx-auto">
                Nossa equipe de concierges digitais está pronta para atender suas dúvidas sobre a plataforma.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                 <h3 className="text-xl font-bold text-zinc-900 mb-8 font-serif">Canais de Atendimento</h3>
                 
                 <div className="space-y-8">
                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 flex-shrink-0">
                          <Mail className="w-5 h-5 text-amber-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-zinc-900 mb-1">Email</h4>
                          <p className="text-stone-500 font-light mb-1">Para vendas e parcerias:</p>
                          <a href="mailto:contato@perfectsalon.com" className="text-zinc-900 hover:text-amber-600 transition-colors font-medium border-b border-stone-200 pb-0.5">contato@perfectsalon.com</a>
                       </div>
                    </div>

                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 flex-shrink-0">
                          <Phone className="w-5 h-5 text-amber-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-zinc-900 mb-1">Telefone / WhatsApp</h4>
                          <p className="text-stone-500 font-light mb-1">Segunda a Sexta, 09h às 18h</p>
                          <span className="text-zinc-900 font-medium">+55 (11) 99999-0000</span>
                       </div>
                    </div>

                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 flex-shrink-0">
                          <MapPin className="w-5 h-5 text-amber-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-zinc-900 mb-1">Escritório</h4>
                          <p className="text-stone-500 font-light leading-relaxed">
                            Av. Paulista, 1000 - Bela Vista<br/>
                            São Paulo - SP, Brasil
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Form */}
              <div className="bg-white p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
                 <h3 className="text-xl font-bold text-zinc-900 mb-6 font-serif">Envie uma mensagem</h3>
                 <form className="space-y-6">
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nome Completo</label>
                       <input type="text" className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900 transition-colors" placeholder="Seu nome" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email Corporativo</label>
                       <input type="email" className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900 transition-colors" placeholder="voce@seusalao.com" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Mensagem</label>
                       <textarea rows={4} className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900 transition-colors" placeholder="Como podemos ajudar?"></textarea>
                    </div>
                    <button type="button" className="w-full bg-zinc-900 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg flex items-center justify-center">
                       <Send className="w-4 h-4 mr-2" />
                       Enviar Solicitação
                    </button>
                 </form>
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
               <Link to="/contact" className="hover:text-white transition-colors text-white font-bold">Contato</Link>
            </div>
            <div className="mt-8 md:mt-0 text-xs font-light">
              &copy; 2024 Perfect Salon. Excellence in Management.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;