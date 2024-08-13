// import React, { useState, useEffect, useRef, FC } from 'react';
// import { IoMdSend, IoMdAttach, IoMdHappy } from 'react-icons/io';
// import { FaLock } from 'react-icons/fa';
// import { MdClose } from 'react-icons/md';
// import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const Footer = () => {
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
    // const [inputMessage, setInputMessage] = useState<string>('');
    // const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    // const [theme, setTheme] = useState<string>('light');
    // const [fontSize, setFontSize] = useState<string>('medium');
    // const [bubbleStyle, setBubbleStyle] = useState<string>('rounded');

    // const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    // const scrollToBottom = (): void => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    // const toggleModal = (): void => setIsOpen(!isOpen);

    // const handleSendMessage = (): void => {
    //     if (inputMessage.trim() !== '') {
    //         setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    //         setInputMessage('');
    //         setTimeout(() => {
    //             setMessages(prevMessages => [...prevMessages, { text: 'Thanks for your message!', sender: 'bot' }]);
    //         }, 1000);
    //     }
    // };

    // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    //     if (e.key === 'Enter') {
    //         handleSendMessage();
    //     }
    // };

    // const handleEmojiClick = (event: React.MouseEvent, emojiObject: EmojiClickData): void => {
    //     setInputMessage(prevInput => prevInput + emojiObject.emoji);
    // };

    // const toggleEmojiPicker = (): void => setShowEmojiPicker(!showEmojiPicker);

    return (
        <>
            <footer className="ltr:md:left-vertical-menu rtl:md:right-vertical-menu group-data-[sidebar-size=md]:ltr:md:left-vertical-menu-md group-data-[sidebar-size=md]:rtl:md:right-vertical-menu-md group-data-[sidebar-size=sm]:ltr:md:left-vertical-menu-sm group-data-[sidebar-size=sm]:rtl:md:right-vertical-menu-sm absolute right-0 bottom-0 px-4 h-14 group-data-[layout=horizontal]:ltr:left-0  group-data-[layout=horizontal]:rtl:right-0 left-0 border-t py-3 flex items-center dark:border-zink-600">
                <div className="group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl w-full">
                    <div className="grid items-center grid-cols-1 text-center lg:grid-cols-2 text-slate-400 dark:text-zink-200 ltr:lg:text-left rtl:lg:text-right">
                        <div>
                            {new Date().getFullYear()} © OffiQuick
                        </div>
                        <div className="hidden lg:block">
                            <div className="ltr:text-right rtl:text-left">
                                Design & Develop by Tech Crature Solution
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className={`fixed bottom-4 right-4 ${isOpen ? 'w-96 h-[22rem]' : 'w-16 h-16'} transition-all duration-300 ease-in-out`}>
                    {!isOpen && (
                        <button
                            onClick={toggleModal}
                            className="w-full h-full bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label="Open chat"
                        >
                            💬
                        </button>
                    )}
                    {isOpen && (
                        <div className={`w-full h-full bg-white shadow-xl rounded-lg flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-lg font-semibold">Chat</h2>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Close chat"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs px-4 py-2 ${message.sender === 'user'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                                } ${bubbleStyle === 'rounded' ? 'rounded-lg' : 'rounded-3xl'}`}
                                            style={{ fontSize: fontSize === 'small' ? '0.875rem' : fontSize === 'large' ? '1.125rem' : '1rem' }}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Type a message..."
                                    />
                                    <button
                                        onClick={toggleEmojiPicker}
                                        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        aria-label="Add emoji"
                                    >
                                        <IoMdHappy size={24} />
                                    </button>
                                    <button
                                        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        aria-label="Attach file"
                                    >
                                        <IoMdAttach size={24} />
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        aria-label="Send message"
                                    >
                                        <IoMdSend size={24} />
                                    </button>
                                </div>
                                {showEmojiPicker && (
                                    <div className="absolute bottom-20 right-4">
                                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                                    </div>
                                )}
                            </div>
                            <div className="px-4 py-2 bg-gray-100 text-xs text-gray-500 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <FaLock size={12} />
                                    <span>End-to-end encrypted</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={theme}
                                        onChange={(e) => setTheme(e.target.value)}
                                        className="bg-transparent border-none focus:outline-none"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                    <select
                                        value={fontSize}
                                        onChange={(e) => setFontSize(e.target.value)}
                                        className="bg-transparent border-none focus:outline-none"
                                    >
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                    <select
                                        value={bubbleStyle}
                                        onChange={(e) => setBubbleStyle(e.target.value)}
                                        className="bg-transparent border-none focus:outline-none"
                                    >
                                        <option value="rounded">Rounded</option>
                                        <option value="pill">Pill</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div> */}
            </footer>
        </>
    );
};

export default Footer;
