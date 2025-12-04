import {useState, useRef} from "react";
import {Upload, FileCheck, ArrowLeft, Loader2} from "lucide-react";
import {Button} from "./ui/button";
import {Card} from "./ui/card";
import {Progress} from "./ui/progress";

interface UploadPageProps {
  onNavigateToLanding: () => void;
  onNavigateToResult: (data: {
    imageUrl: string;
    result: any;
    processingTime: string
    modelResult: any;
  }) => void;
}

export function UploadPage({onNavigateToLanding, onNavigateToResult}: UploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // @ts-ignore
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // @ts-ignore
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // @ts-ignore
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;

    setIsAnalyzing(true);
    setProgress(0);

    const startTime = Date.now(); // Para medir el tiempo total

    try {
      // Convertir previewUrl (data URL o blob URL) a File/Blob
      const response = await fetch(previewUrl);
      const blob = await response.blob();

      // Crear nombre de archivo según el tipo (opcional, pero útil para el backend)
      const fileName = `imagen_analisis.${blob.type.split('/')[1] || 'png'}`;
      const file = new File([blob], fileName, {type: blob.type});

      // Crear FormData
      const formData = new FormData();
      formData.append('image', file); // El nombre 'file' debe coincidir con lo que espera tu backend

      // === Simulación de progreso mientras se sube y procesa ===
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 8 + 4; // Avance variable para que se vea natural
        if (progress >= 90) {
          progress = 90; // No llegamos al 100% hasta tener respuesta real
          clearInterval(interval);
        }
        setProgress(Math.min(Math.round(progress), 100));
      }, 300);

      // === Petición real al backend ===
      const fetchResponse = await fetch('https://insertion-obligations-sport-clicks.trycloudflare.com/predict_rd', {
        method: 'POST',
        body: formData,
        // Importante: NO poner Content-Type manualmente, el navegador lo pone con el boundary correcto
      });

      clearInterval(interval);
      setProgress(95); // Casi terminado...

      if (!fetchResponse.ok) {
        throw new Error(`Error del servidor: ${fetchResponse.status}`);
      }

      const result = await fetchResponse.json();

      console.log(result.probabilities);
      console.log(result.probabilities);

      // Tiempo total de procesamiento
      const endTime = Date.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(2); // en segundos

      // Dentro del try, después de calcular totalTime:

      // Llegamos al 100%
      setProgress(100);

      // Pequeña pausa visual antes de navegar
      setTimeout(() => {
        onNavigateToResult({
          imageUrl: previewUrl,
          result: result,
          processingTime: totalTime,
          modelResult: result.probabilities[0],
        });
      }, 500);

    } catch (error) {
      console.error('Error en el análisis:', error);
      alert('Ocurrió un error al analizar la imagen. Revisa la consola.');
      setIsAnalyzing(false);
      setProgress(0);
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
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-white"/>
              </div>
              <span className="text-xl text-primary" style={{fontWeight: 600}}>FibroScan AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 style={{fontSize: '2.5rem', fontWeight: 600, color: '#001dcb', marginBottom: '0.5rem'}}>
              Cargar ecografía
            </h1>
            <p className="text-muted-foreground" style={{fontSize: '1.125rem'}}>
              Arrastra tu imagen o haz clic para seleccionar desde tu dispositivo
            </p>
          </div>

          <Card className="p-8 rounded-2xl shadow-xl border-0">
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-gray-300 hover:border-primary hover:bg-primary/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="space-y-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-96 mx-auto rounded-xl shadow-lg"
                  />
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileCheck className="w-5 h-5"/>
                    <span style={{fontWeight: 500}}>{selectedFile?.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Cambiar imagen
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Upload className="w-10 h-10 text-primary"/>
                  </div>
                  <div>
                    <p style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem'}}>
                      Arrastra tu ecografía aquí
                    </p>
                    <p className="text-muted-foreground">
                      o haz clic para seleccionar un archivo
                    </p>
                  </div>
                  <p className="text-muted-foreground" style={{fontSize: '0.875rem'}}>
                    Formatos soportados: JPEG, PNG, DICOM (máx. 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Analysis Section */}
            {isAnalyzing && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-3 text-primary">
                  <Loader2 className="w-6 h-6 animate-spin"/>
                  <span style={{fontSize: '1.125rem', fontWeight: 500}}>
                    Analizando imagen...
                  </span>
                </div>
                <Progress value={progress} className="h-3"/>
                <p className="text-center text-muted-foreground">
                  {progress}% completado
                </p>
              </div>
            )}

            {/* Analyze Button */}
            {previewUrl && !isAnalyzing && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleAnalyze}
                  className="bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{fontSize: '1.125rem'}}
                >
                  <div className="w-5 h-5 mr-2"/>
                  Analizar imagen
                </Button>
              </div>
            )}
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6 rounded-xl border-0 shadow-md bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-5 h-5 text-primary"/>
                </div>
                <div>
                  <h4 style={{fontWeight: 600, marginBottom: '0.25rem'}}>Seguro</h4>
                  <p className="text-muted-foreground" style={{fontSize: '0.875rem'}}>
                    Tus datos están encriptados y protegidos
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-xl border-0 shadow-md bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-5 h-5 text-primary"/>
                </div>
                <div>
                  <h4 style={{fontWeight: 600, marginBottom: '0.25rem'}}>Rápido</h4>
                  <p className="text-muted-foreground" style={{fontSize: '0.875rem'}}>
                    Resultados en menos de 30 segundos
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-xl border-0 shadow-md bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-primary"/>
                </div>
                <div>
                  <h4 style={{fontWeight: 600, marginBottom: '0.25rem'}}>Preciso</h4>
                  <p className="text-muted-foreground" style={{fontSize: '0.875rem'}}>
                    Presición en la predicción superior al 90%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
