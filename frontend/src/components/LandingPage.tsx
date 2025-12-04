import {Upload, Search, FileCheck, Mail, FileText, Shield} from "lucide-react";
import {Button} from "./ui/button";
import {Card} from "./ui/card";
import {ImageWithFallback} from "./figma/ImageWithFallback";
import fundacionSantafe from "../assets/fundacion_santafe.jpeg";

interface LandingPageProps {
  onNavigateToUpload: () => void;
}

export function LandingPage({onNavigateToUpload}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white"/>
            </div>
            <span className="text-xl text-primary" style={{fontWeight: 600}}>FibroScan AI</span>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Iniciar sesión
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6" style={{fontSize: '3rem', fontWeight: 700, lineHeight: 1.2, color: '#001dcb'}}>
                Análisis inteligente de ecografías
              </h1>
              <p className="mb-8 text-muted-foreground" style={{fontSize: '1.25rem', lineHeight: 1.6}}>
                Tecnología de inteligencia artificial avanzada para diagnósticos rápidos y precisos.
                Sube las ecografías de tus pacientes y recibe análisis detallados en segundos.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={onNavigateToUpload}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{fontSize: '1.125rem'}}
                >
                  <Upload className="w-5 h-5 mr-2"/>
                  Analizar ecografía
                </Button>
                {/*<Button*/}
                {/*  variant="outline"*/}
                {/*  className="px-8 py-6 rounded-xl border-2 border-primary text-primary hover:bg-primary/5"*/}
                {/*  style={{fontSize: '1.125rem'}}*/}
                {/*>*/}
                {/*  Ver demo*/}
                {/*</Button>*/}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={fundacionSantafe}
                  alt="Medical AI Technology"
                  className="w-full h-auto"
                />
              </div>
              {/*<div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">*/}
              {/*  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">*/}
              {/*    <Search className="w-6 h-6 text-primary"/>*/}
              {/*  </div>*/}
              {/*  <div>*/}
              {/*    <div style={{fontSize: '0.875rem', color: '#717182'}}>Precisión del modelo</div>*/}
              {/*    <div style={{fontSize: '1.25rem', fontWeight: 600, color: '#001dcb'}}>98.5%</div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 style={{fontSize: '2.5rem', fontWeight: 600, color: '#001dcb', marginBottom: '1rem'}}>
              Cómo funciona
            </h2>
            <p className="text-muted-foreground" style={{fontSize: '1.125rem'}}>
              Tres pasos sencillos para obtener un análisis completo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-primary"/>
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#001dcb'}}>
                1. Subir imagen
              </h3>
              <p className="text-muted-foreground">
                Arrastra o selecciona la ecografía desde tu dispositivo.
                Soportamos formatos JPEG, PNG y DICOM.
              </p>
            </Card>

            <Card className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-primary"/>
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#001dcb'}}>
                2. Análisis IA
              </h3>
              <p className="text-muted-foreground">
                Nuestra inteligencia artificial procesa la imagen utilizando
                redes neuronales entrenadas con millones de casos.
              </p>
            </Card>

            <Card className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <FileCheck className="w-8 h-8 text-primary"/>
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#001dcb'}}>
                3. Resultado
              </h3>
              <p className="text-muted-foreground">
                Recibe un diagnóstico detallado con nivel de confianza,
                hallazgos y recomendaciones clínicas.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-white"/>
                </div>
                <span style={{fontWeight: 600, color: '#001dcb'}}>FibroScan AI</span>
              </div>
              <p className="text-muted-foreground" style={{fontSize: '0.875rem'}}>
                Análisis de ecografías con inteligencia artificial para profesionales médicos.
              </p>
            </div>

            <div>
              <h4 style={{fontWeight: 600, marginBottom: '1rem'}}>Producto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors"
                       style={{fontSize: '0.875rem'}}>Características</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors"
                       style={{fontSize: '0.875rem'}}>Precios</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors"
                       style={{fontSize: '0.875rem'}}>API</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{fontWeight: 600, marginBottom: '1rem'}}>Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#"
                     className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                     style={{fontSize: '0.875rem'}}>
                    <Shield className="w-4 h-4"/>
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#"
                     className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                     style={{fontSize: '0.875rem'}}>
                    <FileText className="w-4 h-4"/>
                    Términos de uso
                  </a>
                </li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors"
                       style={{fontSize: '0.875rem'}}>HIPAA Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{fontWeight: 600, marginBottom: '1rem'}}>Contacto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contacto@fibroscan.ai"
                     className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                     style={{fontSize: '0.875rem'}}>
                    <Mail className="w-4 h-4"/>
                    contacto@fibroscan.ai
                  </a>
                </li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors"
                       style={{fontSize: '0.875rem'}}>Soporte técnico</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center">
            <p className="text-muted-foreground" style={{fontSize: '0.875rem'}}>
              © 2025 FibroScan AI. Todos los derechos reservados. Este sistema es una herramienta de apoyo al diagnóstico
              y no reemplaza el criterio médico profesional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
