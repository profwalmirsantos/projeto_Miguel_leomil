import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Use a ref for the synth object to avoid issues with stale closures.
  const synthRef = useRef(window.speechSynthesis);

  // This function is called when an utterance ends, errors, or is cancelled.
  const handleSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const speak = useCallback((text: string, lang: string = 'pt-BR') => {
    const synth = synthRef.current;
    
    // If speech is in progress, cancel it before starting new speech.
    if (synth.speaking) {
      synth.cancel();
    }
    
    // A small timeout helps prevent race conditions in some browsers
    // where cancel() is not immediate.
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        
        utterance.onend = handleSpeechEnd;
        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
            console.error('SpeechSynthesisUtterance.onerror:', event.error);
            handleSpeechEnd();
        };
        
        // Find a voice more robustly.
        const voices = synth.getVoices();
        const voice = voices.find(v => v.lang === lang || v.lang.startsWith(`${lang}-`));
        if (voice) {
          utterance.voice = voice;
        } else {
          console.warn(`No voice found for language "${lang}", using browser default.`);
        }
        
        synth.speak(utterance);
        setIsSpeaking(true);
        setIsPaused(false);
    }, 100);

  }, [handleSpeechEnd]);
  
  useEffect(() => {
    const synth = synthRef.current;
    
    // Load voices when they are ready.
    const onVoicesChanged = () => {
        synth.getVoices();
    };
    synth.addEventListener('voiceschanged', onVoicesChanged);
    onVoicesChanged(); // Initial call

    // This interval is a workaround for a known Chrome bug where speech synthesis
    // can stop working after about 15 seconds of inactivity.
    const keepAliveInterval = setInterval(() => {
        if (synth.speaking && !synth.paused) {
            synth.pause();
            synth.resume();
        }
    }, 14000);

    return () => {
        // Cleanup on component unmount.
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        clearInterval(keepAliveInterval);
        if (synth.speaking) {
            synth.cancel();
        }
    };
  }, []);

  const cancel = useCallback(() => {
    const synth = synthRef.current;
    if (synth.speaking) {
      synth.cancel();
    }
  }, []);

  const togglePause = useCallback(() => {
    const synth = synthRef.current;
    if (isSpeaking) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    }
  }, [isSpeaking, isPaused]);

  return { speak, cancel, togglePause, isSpeaking, isPaused };
};
