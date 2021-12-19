<template>
    <div
        class="grid grid-cols-16 gap-2 p-2 border border-orange-500 rounded-xl bg-white bg-opacity-5 font-mono text-sm"
    >
        <div class="flex items-end justify-between col-span-16">
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>1<br />0</div>
            <div>1<br />1</div>
            <div>1<br />2</div>
            <div>1<br />3</div>
            <div>1<br />4</div>
            <div>1<br />5</div>
        </div>
        <div class="bg-$prism-background rounded p-2 text-center col-span-16">ID</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-1">QR</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-4 col-start-2">
            OPCODE
        </div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-1 col-start-6">AA</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-1 col-start-7">TC</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-1 col-start-8">RD</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-1 col-start-9">RA</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-3 col-start-10">Z</div>
        <div class="bg-$prism-background rounded py-2 text-center col-span-4 col-start-13">
            RCODE
        </div>
        <div class="bg-$prism-background rounded p-2 text-center col-span-16">QDCOUNT</div>
        <div class="bg-$prism-background rounded p-2 text-center col-span-16">ANCOUNT</div>
        <div class="bg-$prism-background rounded p-2 text-center col-span-16">NSCOUNT</div>
        <div class="bg-$prism-background rounded p-2 text-center col-span-16">ARCOUNT</div>
    </div>
</template>
