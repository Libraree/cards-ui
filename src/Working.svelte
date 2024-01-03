<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import type CardContext from './back/CardContext';
    import { Screen } from './back/Screens';
    import _ from 'underscore';
    import { BARCODES } from './back/Barcode';
    import  BarcodeResult from './back/BarcodeResult';
    import { 
        convert_js_image_to_luma, 
        decode_barcode_with_hints, 
        DecodeHintDictionary,
        DecodeHintTypes } from 'rxing-wasm';

	const dispatch = createEventDispatcher();
	export let context: CardContext;

    onMount(async () => {
        const readers = _
            .chain(BARCODES)
            .filter(x => x.reader)
            .value();

        const results: BarcodeResult[] = [];

        for (const reader of readers) {
            try {
                const luma8Data = convert_js_image_to_luma(context.croppedImage!);
                const hints = new DecodeHintDictionary();
                hints.set_hint(DecodeHintTypes.PossibleFormats, reader.reader);
                hints.set_hint(DecodeHintTypes.TryHarder, 'true');

                if (reader.hints) {
                    for (const key in reader.hints) {
                        hints.set_hint(parseInt(key), reader.hints[key]);
                    }
                }

                const result = decode_barcode_with_hints(luma8Data, context.width!, context.height!, hints);
          
                if (result.text()) {
                    results.push(new BarcodeResult(reader.type, result.text() ?? ''));
                }
            }
            catch(e) {
                console.log(e);
            }
        }

        const match = results.find(x => x.isMatch(context.number ?? ''));

        context.scannedNumber = match?.code;
        context.type = BARCODES.find(x => x.type == match?.type);
        context.discovered = true;
        context.screen = match ? Screen.Name : Screen.Support;

        dispatch('next');
    });

</script>

<style>
    #progress {
        max-height: 150px;
    }
</style>

<div class="row">
    <div class="col">
        <div class="m-5 text-center">
            <p><img id="progress" src="/images/progress-anim.gif" alt="Working.." /></p>
        </div>
    </div>
</div>
<div class="row">
    <div class="col">
        <div class="m-5 text-center">
            <p>Please wait..</p>
        </div>
    </div>
</div>
