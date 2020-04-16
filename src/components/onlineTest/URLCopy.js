import React, { useRef, useState } from 'react';
import {
  Button, InputGroup, InputGroupAddon,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const URLCopy = ({ url }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copiado!');
  }

  return (
    <div>
      {
       document.queryCommandSupported('copy')
        && (
        <>
          <InputGroup>
            <input
              readOnly
              ref={textAreaRef}
              value={url}
              className="form-control"
            />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={copyToClipboard}>
                <FontAwesomeIcon icon="link" />
                {' Copiar link'}
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <p className="text-right" style={{ fontSize: '13px' }}>{copySuccess}</p>
        </>
        )
      }
    </div>
  );
};

export default URLCopy;
