import {AlertCircle, ArrowLeft, CheckCircle2, Download, FileCheck, Info, Share2} from "lucide-react";
import {Button} from "./ui/button";
import {Card} from "./ui/card";

interface ResultPageProps {
  imageUrl: string;
  onNavigateToUpload: () => void;
  onNavigateToLanding: () => void;
  processingTime: string;
  modelResult: string[];
}

export function ResultPage({
                             imageUrl,
                             onNavigateToUpload,
                             onNavigateToLanding,
                             processingTime,
                             modelResult
                           }: ResultPageProps) {

  const toPercent = (value: string | number): string => {
    const numStr = String(value).trim();
    if (!numStr || isNaN(Number(numStr))) return "0.00%";
    const num = parseFloat(numStr);
    return `${(num * 100).toFixed(2)}%`;
  };

  const getMayorPercent = (array: string[] | number[]): number => {
    const nums = array.map((num: any) => Number(num));
    const mayor = Math.max(...nums);
    return nums.indexOf(mayor);
  };


  const analysis = {
    findings: [
      {
        title: "F0 - Sin fibrosis",
        severity: "",
        description: toPercent(modelResult[0])
      },
      {
        title: "F1 - Fibrosis portal sin septos",
        severity: "",
        description: toPercent(modelResult[1])
      },
      {
        title: "F2 - Fibrosis portal con septos escasos",
        severity: "",
        description: toPercent(modelResult[2])
      },
      {
        title: "F3 - Numerosos septos fibrosos, pero sin cirrosis",
        severity: "",
        description: toPercent(modelResult[3])
      },
      {
        title: "F4 - Fibrosis avanzada con nódulos de regeneración (Cirrosis)",
        severity: "",
        description: toPercent(modelResult[4])
      }
    ],

    confidence: 94,
    metadata: {
      analyzedAt: new Date().toLocaleString('es-ES'),
      modelVersion: "v2.4.1",
      processingTime: processingTime
    }
  };

  const diagnosis: string = analysis.findings[getMayorPercent(modelResult)].title;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="w-4 h-4"/>;
      case "medium":
        return <Info className="w-4 h-4"/>;
      case "low":
        return <CheckCircle2 className="w-4 h-4"/>;
      default:
        return <Info className="w-4 h-4"/>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onNavigateToLanding}
              className="text-primary hover:bg-primary/5"
            >
              <ArrowLeft className="w-5 h-5 mr-2"/>
              Inicio
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-white"/>
              </div>
              <span className="text-xl text-primary" style={{fontWeight: 600}}>MediScan AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <Share2 className="w-4 h-4 mr-2"/>
              Compartir
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <Download className="w-4 h-4 mr-2"/>
              Descargar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 style={{fontSize: '2.5rem', fontWeight: 600, color: '#001dcb', marginBottom: '0.5rem'}}>
              Resultado del análisis
            </h1>
            <p className="text-muted-foreground" style={{fontSize: '1.125rem'}}>
              Análisis completado el {analysis.metadata.analyzedAt}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div>
              <Card className="p-6 rounded-2xl shadow-xl border-0 bg-white">
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem'}}>
                  Ecografía analizada
                </h3>
                <div className="rounded-xl overflow-hidden bg-gray-50">
                  <img
                    src={imageUrl}
                    alt="Radiografía analizada"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Tiempo de procesamiento: {analysis.metadata.processingTime}</span>
                  <span>Modelo: {analysis.metadata.modelVersion}</span>
                </div>
              </Card>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {/* Main Diagnosis */}
              <Card className="p-6 rounded-2xl shadow-xl border-0 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem'}}>
                      Diagnóstico principal
                    </h3>
                    <p style={{fontSize: '1.5rem', fontWeight: 600, color: '#001dcb'}}>
                      {diagnosis}
                    </p>
                  </div>
                </div>

                {/*<div className="mt-6">*/}
                {/*  <div className="flex items-center justify-between mb-2">*/}
                {/*    <span style={{fontWeight: 500}}>Nivel de confianza</span>*/}
                {/*    <span style={{fontSize: '1.5rem', fontWeight: 600, color: '#001dcb'}}>*/}
                {/*      {analysis.confidence}%*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </Card>

              {/* Findings */}
              <Card className="p-6 rounded-2xl shadow-xl border-0 bg-white">
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem'}}>
                  Probabilidades por fases
                </h3>
                <div className="space-y-4">
                  {analysis.findings.map((finding, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${getSeverityColor(finding.severity)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(finding.severity)}
                        <div className="flex-1">
                          <h4 style={{fontWeight: 600, marginBottom: '0.25rem'}}>
                            {finding.title}
                          </h4>
                          <p style={{fontSize: '0.875rem'}}>
                            {finding.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations */}
              {/*<Card className="p-6 rounded-2xl shadow-xl border-0 bg-white">*/}
              {/*  <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem'}}>*/}
              {/*    Recomendaciones clínicas*/}
              {/*  </h3>*/}
              {/*  <div className="space-y-3">*/}
              {/*    {analysis.recommendations.map((recommendation, index) => (*/}
              {/*      <div key={index} className="flex items-start gap-3">*/}
              {/*        <div*/}
              {/*          className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">*/}
              {/*          <span className="text-primary" style={{fontSize: '0.75rem', fontWeight: 600}}>*/}
              {/*            {index + 1}*/}
              {/*          </span>*/}
              {/*        </div>*/}
              {/*        <p className="flex-1">{recommendation}</p>*/}
              {/*      </div>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</Card>*/}

              {/* Disclaimer */}
              <Card className="p-4 rounded-xl border-0 bg-yellow-50 border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5"/>
                  <p className="text-yellow-700" style={{fontSize: '0.875rem'}}>
                    <strong>Importante:</strong> Este análisis es una herramienta de apoyo diagnóstico.
                    Los resultados deben ser validados por un médico profesional. No utilizar como único criterio para
                    toma de decisiones clínicas.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={onNavigateToUpload}
              className="bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{fontSize: '1.125rem'}}
            >
              <FileCheck className="w-5 h-5 mr-2"/>
              Analizar otra imagen
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
