import { Transform } from 'stream';

const transform = () => {
    const reverseStream = new Transform({
        transform(chunk, _, callback) {
            const reversedText = chunk.toString().split('').reverse().join('') + '\n' + '\n';
            this.push(reversedText);
            callback();
        }
    });

    reverseStream.on('error', (error) => {
        console.error("An error occurred in the reverse stream:", error.message);
        throw new Error('Transformation operation failed');
    });

    process.stdin.pipe(reverseStream).pipe(process.stdout);
};

transform();