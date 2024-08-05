import React, { useState, useEffect } from 'react';

interface Idea {
  content: string;
  tags: string;
  timestamp: Date;
}

const IdeaGramer: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [size, setSize] = useState<'pocket' | 'normal' | 'large'>('normal');
  const [idea, setIdea] = useState('');
  const [tags, setTags] = useState('');
  const [combination, setCombination] = useState('');
  const [textColor, setTextColor] = useState<'black' | 'white' | 'green' | 'blue' | 'violet'>('black');
  const [history, setHistory] = useState<Idea[]>([]);

  useEffect(() => {
    setTextColor(mode === 'light' ? 'black' : 'white');
  }, [mode]);

  const handleLanguageChange = (newLanguage: 'en' | 'es') => setLanguage(newLanguage);
  const handleModeChange = (newMode: 'light' | 'dark') => setMode(newMode);
  const handleSizeChange = (newSize: 'pocket' | 'normal' | 'large') => setSize(newSize);
  const handleTextColorChange = (newColor: 'black' | 'white' | 'green' | 'blue' | 'violet') => setTextColor(newColor);

  const handleInputChange = (setFunction: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFunction(e.target.value);

  const handleCombine = () => {
    const formattedTags = tags.split('\n').map(tag => tag.startsWith('#') ? tag : `#${tag}`).join('\n');
    setCombination(`${idea}\n${formattedTags}`);
    setHistory([...history, { content: idea, tags: formattedTags, timestamp: new Date() }]);
  };

  const handleCopy = () => navigator.clipboard.writeText(combination);
  const handleClear = () => {
    setIdea('');
    setTags('');
    setCombination('');
  };
  const handleReset = () => {
    setLanguage('es');
    setMode('light');
    setSize('normal');
    setTextColor('black');
    handleClear();
    setHistory([]);
  };

  const sizeClass = size === 'pocket' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base';
  const bgClass = mode === 'light' ? 'bg-white' : 'bg-gray-900';
  const borderClass = 'border-2 border-silver';

  return (
    <div className={`min-h-screen ${bgClass} ${sizeClass} flex flex-col`}>
      <header className="text-2xl font-bold text-center p-4" style={{ color: textColor }}>
        IdeaGramer
      </header>

      <section className={`p-4 ${borderClass}`}>
        <select onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'es')} value={language}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <select onChange={(e) => handleModeChange(e.target.value as 'light' | 'dark')} value={mode}>
          <option value="light">{language === 'en' ? 'Light Mode' : 'Modo Claro'}</option>
          <option value="dark">{language === 'en' ? 'Dark Mode' : 'Modo Oscuro'}</option>
        </select>
        <select onChange={(e) => handleSizeChange(e.target.value as 'pocket' | 'normal' | 'large')} value={size}>
          <option value="pocket">Pocket</option>
          <option value="normal">Normal</option>
          <option value="large">{language === 'en' ? 'Large' : 'Grande'}</option>
        </select>
      </section>

      <main className={`p-4 ${borderClass} flex-grow`}>
        <input
          type="text"
          value={idea}
          onChange={handleInputChange(setIdea)}
          placeholder={language === 'en' ? 'Idea' : 'Idea'}
          className={`w-full p-2 mb-4 ${borderClass}`}
          style={{ color: textColor }}
        />
        <textarea
          value={tags}
          onChange={handleInputChange(setTags)}
          placeholder={language === 'en' ? 'Tags (one per line)' : 'Etiquetas (una por línea)'}
          className={`w-full p-2 mb-4 ${borderClass}`}
          style={{ color: textColor }}
        />
        <textarea
          value={combination}
          onChange={handleInputChange(setCombination)}
          placeholder={language === 'en' ? 'Idea Combination' : 'Combinación de Ideas'}
          className={`w-full p-2 mb-4 ${borderClass}`}
          style={{ color: textColor }}
        />
        <div className="flex space-x-2">
          <button onClick={handleCombine} className="p-2 bg-blue-500 text-white rounded">{language === 'en' ? 'Combine' : 'Combinar'}</button>
          <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded">{language === 'en' ? 'Copy' : 'Copiar'}</button>
        </div>
      </main>

      <section className={`p-4 ${borderClass} flex justify-around`}>
        {['black', 'white', 'green', 'blue', 'violet'].map(color => (
          <button
            key={color}
            onClick={() => handleTextColorChange(color as 'black' | 'white' | 'green' | 'blue' | 'violet')}
            className={`w-8 h-8 rounded-full ${borderClass}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </section>

      <section className={`p-4 ${borderClass}`}>
        <h2>{language === 'en' ? 'Idea History' : 'Historial de Ideas'}</h2>
        {history.map((item, index) => (
          <div key={index}>
            <p>{item.content}</p>
            <p>{item.tags}</p>
            <p>{item.timestamp.toLocaleString()}</p>
          </div>
        ))}
      </section>

      <footer className={`p-4 ${borderClass} flex space-x-2`}>
        <button onClick={handleClear} className="p-2 bg-yellow-500 text-white rounded">{language === 'en' ? 'Clear' : 'Limpiar'}</button>
        <button onClick={handleReset} className="p-2 bg-red-500 text-white rounded">{language === 'en' ? 'Reset' : 'Restablecer'}</button>
      </footer>
    </div>
  );
};

export default IdeaGramer;
