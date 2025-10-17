/**
 * Audio utility for Dutch pronunciation using Web Speech API
 */

export function speakDutch(text: string): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set Dutch language
  utterance.lang = 'nl-NL';
  
  // Adjust speech parameters for better pronunciation
  utterance.rate = 0.85; // Slightly slower for learners
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to find a Dutch voice
  const voices = window.speechSynthesis.getVoices();
  const dutchVoice = voices.find(voice => 
    voice.lang === 'nl-NL' || 
    voice.lang === 'nl-BE' || 
    voice.lang.startsWith('nl')
  );

  if (dutchVoice) {
    utterance.voice = dutchVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Load voices on page load
if ('speechSynthesis' in window) {
  // Chrome needs this to load voices
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

