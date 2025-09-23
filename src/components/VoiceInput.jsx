import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VoiceInput = ({ onResult, placeholder = "Click to speak..." }) => {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      
      // Set language based on current language
      const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'ml': 'ml-IN',
        'bn': 'bn-IN'
      };
      recognitionInstance.lang = langMap[language] || 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [language, onResult]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language for speech synthesis
      const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'ml': 'ml-IN',
        'bn': 'bn-IN'
      };
      utterance.lang = langMap[language] || 'en-US';
      
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500 p-2">
        Voice input not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-full transition-colors ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-primary text-white hover:bg-primary-dark'
        }`}
        title={isListening ? t('listening') : t('voiceInput')}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
      
      <button
        onClick={() => speakText(placeholder)}
        className="p-2 rounded-full bg-secondary text-white hover:bg-secondary-dark transition-colors"
        title={t('speakToMe')}
      >
        <Volume2 className="w-4 h-4" />
      </button>
      
      {isListening && (
        <span className="text-sm text-primary font-medium animate-pulse">
          {t('listening')}
        </span>
      )}
    </div>
  );
};

export default VoiceInput;