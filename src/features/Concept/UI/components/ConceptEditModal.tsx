'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEdit,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { Concept } from '../types/types';

interface ConceptEditModalProps {
  concept: Concept;
  isOpen: boolean;
  onCloseAction: () => void;
  onSaveAction?: (updatedConcept: Concept) => void;
}

export function ConceptEditModal({
  concept,
  isOpen,
  onCloseAction,
  onSaveAction,
}: ConceptEditModalProps) {
  const [editedConcept, setEditedConcept] = useState<Concept>(concept);

  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; type: 'user' | 'ai'; message: string; timestamp: Date }>
  >([
    {
      id: '1',
      type: 'ai',
      message:
        "Hello! I'm here to help you refine this concept. What would you like to improve?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSaveAction) {
      onSaveAction(editedConcept);
    }
    onCloseAction();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      message: newMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        message:
          'I understand you want to modify this concept. This is a demo response - in a real implementation, this would be connected to an AI service.',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Concept</h2>
          <button
            onClick={onCloseAction}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Concept Card */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="mx-auto max-w-2xl">
              <div className="mb-4">
                <div className="mb-2 flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="h-4 w-4 text-white"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Concept Details
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Modify your concept content and settings
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={editedConcept.title}
                        onChange={(e) =>
                          setEditedConcept((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        {editedConcept.category}
                      </span>
                    </div>
                  </div>

                  <textarea
                    value={editedConcept.description}
                    onChange={(e) =>
                      setEditedConcept((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                  />
                </div>

                {/* Key Message */}
                <div className="border-b border-gray-200 p-6">
                  <h4 className="mb-2 text-sm font-medium text-gray-900">
                    Key Message
                  </h4>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <textarea
                      value={editedConcept.keyMessage}
                      onChange={(e) =>
                        setEditedConcept((prev) => ({
                          ...prev,
                          keyMessage: e.target.value,
                        }))
                      }
                      className="w-full resize-none border-none bg-transparent text-sm text-gray-900 italic focus:outline-none"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Visual Elements */}
                <div className="border-b border-gray-200 p-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-900">
                    Visual Elements
                  </h4>
                  <div className="space-y-2">
                    {editedConcept.visualElements.map((element, index) => (
                      <input
                        key={index}
                        type="text"
                        value={element}
                        onChange={(e) => {
                          const newElements = [...editedConcept.visualElements];
                          newElements[index] = e.target.value;
                          setEditedConcept((prev) => ({
                            ...prev,
                            visualElements: newElements,
                          }));
                        }}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="border-b border-gray-200 p-6">
                  <h4 className="mb-2 text-sm font-medium text-gray-900">
                    Call to Action
                  </h4>
                  <input
                    type="text"
                    value={editedConcept.callToAction}
                    onChange={(e) =>
                      setEditedConcept((prev) => ({
                        ...prev,
                        callToAction: e.target.value,
                      }))
                    }
                    className="placeholder-opacity-80 inline-flex w-full items-center rounded-md border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white placeholder-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Metrics */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">
                          Estimated Reach
                        </span>
                        <input
                          type="number"
                          value={editedConcept.estimatedReach}
                          onChange={(e) =>
                            setEditedConcept((prev) => ({
                              ...prev,
                              estimatedReach: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">
                          Engagement Rate
                        </span>
                        <input
                          type="number"
                          value={editedConcept.estimatedEngagement}
                          onChange={(e) =>
                            setEditedConcept((prev) => ({
                              ...prev,
                              estimatedEngagement:
                                parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-16 rounded border border-gray-300 px-2 py-1 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - AI Chat */}
          <div className="flex w-96 flex-col border-l-2 border-blue-200 bg-blue-50">
            <div className="border-b border-blue-200 bg-blue-100 p-4">
              <div className="mb-1 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="h-4 w-4 text-white"
                  />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">
                  AI Assistant
                </h3>
              </div>
              <p className="text-sm text-blue-700">
                Get suggestions for improving your concept
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-white p-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'border border-blue-200 bg-blue-100 text-blue-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.type === 'user'
                          ? 'text-blue-100'
                          : 'text-blue-600'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-blue-200 bg-blue-50 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask for suggestions..."
                  className="flex-1 rounded-md border border-blue-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 border-t border-gray-200 p-6">
          <button
            onClick={onCloseAction}
            className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
