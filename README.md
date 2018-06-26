# utf8-byte-chunks

A utility that splits a given string into chunks of a maximum size in bytes.

## use case

The primary use case was feeding user input to a chat API that accepts input of max 255 bytes per message.

Limiting the number of input characters was not an option. Users should be able to submit larger text, e.g. copy-pasted from some documents, potentially containing multibyte characters.

The most viable option seemed to be sending multiple requests, each carrying up to 255 bytes of text, until the entire message was sent.

## installation

Via npm:

```javascript
npm install --save utf8-byte-chunks
```

Via yarn:

```javascript
yarn add utf8-byte-chunks
```


## Example usage


```javascript

import getBytesizedChunks from 'utf8-byte-chunks';

async handleSubmit(event) {
    event.preventDefault();

    // split the current text into chunks, then submit each of them individually
    const chunks = getBytesizedChunks(this.state.text, 255);
    for (let chunk of chunks) {
        if (this._isMounted) {
            await ChatStore.submitMessage(chunk);
        }
    }

    if (this._isMounted) {
        this.setState({ text: '' }, this.focusInput);
    }
}
```

