import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Users,
  MessageCircle,
  Settings,
  Monitor,
  Camera
} from 'lucide-react';

const DoctorConsultation = () => {
  const { t } = useLanguage();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const intervalRef = useRef(null);

  // Mock doctors for consultation
  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Priya Nair',
      specialization: 'General Medicine',
      rating: 4.8,
      experience: '12 years',
      languages: ['English', 'Hindi', 'Malayalam'],
      available: true,
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      rating: 4.9,
      experience: '15 years',
      languages: ['English', 'Hindi', 'Bengali'],
      available: true,
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Dr. Meera Sharma',
      specialization: 'Pediatrics',
      rating: 4.7,
      experience: '10 years',
      languages: ['English', 'Hindi', 'Malayalam'],
      available: false,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(availableDoctors[0]);

  useEffect(() => {
    if (isCallActive) {
      // Start call duration timer
      intervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Simulate connection status
      setConnectionStatus('connecting');
      setTimeout(() => setConnectionStatus('connected'), 2000);

      // Initialize mock video streams
      initializeMockVideo();
    } else {
      // Clear timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCallDuration(0);
      setConnectionStatus('disconnected');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCallActive]);

  const initializeMockVideo = async () => {
    try {
      // Get user media for local video
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoEnabled, 
          audio: isAudioEnabled 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }
    } catch (error) {
      console.log('Camera/microphone access denied or not available');
      // Show mock video instead
      showMockVideo();
    }
  };

  const showMockVideo = () => {
    // Create mock video elements with colored backgrounds
    if (localVideoRef.current) {
      localVideoRef.current.style.background = 'linear-gradient(45deg, #059669, #0d9488)';
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.style.background = 'linear-gradient(45deg, #2563eb, #1d4ed8)';
    }
  };

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    // Stop all media streams
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => track.enabled = !isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => track.enabled = !isAudioEnabled);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-[10vh]">
          {!isCallActive ? (
            // Pre-call interface
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Doctor Consultation
                </h1>
                <p className="text-xl text-gray-600">
                  Connect with qualified doctors for instant medical consultation
                </p>
              </div>

              {/* Available Doctors */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Available Doctors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedDoctor.id === doctor.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${!doctor.available ? 'opacity-50' : ''}`}
                      onClick={() => doctor.available && setSelectedDoctor(doctor)}
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm text-gray-600">{doctor.rating}</span>
                            <span className="text-sm text-gray-500">• {doctor.experience}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                        
                        <div className={`text-sm font-medium ${
                          doctor.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {doctor.available ? '🟢 Available Now' : '🔴 Busy'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Consultation */}
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="mb-6">
                  <Video className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to Start Consultation?
                  </h3>
                  <p className="text-gray-600">
                    You will be connected with <strong>{selectedDoctor.name}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startCall}
                    disabled={!selectedDoctor.available}
                    className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Video className="w-5 h-5" />
                    <span>{t('startConsultation')}</span>
                  </button>
                  
                  <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat Only</span>
                  </button>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p>💡 Demo Mode: This is a prototype demonstration</p>
                  <p>In production, this would connect to real doctors via Agora SDK</p>
                </div>
              </div>
            </div>
          ) : (
            // Active call interface
            <div className="h-[calc(100vh-12rem)]">
              {/* Call Header */}
              <div className="bg-white rounded-t-xl shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`text-sm font-medium ${getConnectionStatusColor()}`}>
                    {connectionStatus === 'connected' && `⏱️ ${formatDuration(callDuration)}`}
                    {connectionStatus === 'connecting' && '🔄 Connecting...'}
                    {connectionStatus === 'disconnected' && '❌ Disconnected'}
                  </div>
                </div>
              </div>

              {/* Video Area */}
              <div className="bg-gray-900 relative h-[calc(100%-8rem)] rounded-none">
                {/* Remote Video (Doctor) */}
                <video
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  style={{
                    background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
                
                {/* Mock doctor video overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        className="w-28 h-28 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{selectedDoctor.name}</h3>
                    <p className="text-blue-200">{selectedDoctor.specialization}</p>
                  </div>
                </div>

                {/* Local Video (User) */}
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    style={{
                      background: 'linear-gradient(45deg, #059669, #0d9488)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Camera className="w-8 h-8" />
                      </div>
                      <p className="text-sm">You</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="bg-white rounded-b-xl shadow-sm p-4">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-full transition-colors ${
                      isAudioEnabled
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full transition-colors ${
                      isVideoEnabled
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={endCall}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>

                  <button className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>

                  <button className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;