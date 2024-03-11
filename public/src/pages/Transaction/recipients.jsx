import React from 'react';
import AddToken from './addToken';

const RecipientFormOverlay = ({
  showOverlay,
  onClose,
  recipients,
  initialTokens,
  handleTokenChange,
  handleRecipientChange,
  setRecipients,
  setTokens,
}) => {
  if (!showOverlay) return null;

  const handleOverlaySubmit = (submittedTokens) => {
    setTokens(submittedTokens);
    onClose(); // Close the overlay after submission
  };

  // Your JSX for the recipient form here...

  return (
    <div className="overlay">
      <div className="overlay-content">
        {/* Your recipient form JSX */}
        <AddToken
          recipientId={recipients[recipients.length - 1].id}
          initialTokens={initialTokens}
          onSubmit={(selectedTokens) => {
            handleTokenChange(recipients[recipients.length - 1].id, selectedTokens);
            handleOverlaySubmit(selectedTokens);
          }}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default RecipientFormOverlay;
