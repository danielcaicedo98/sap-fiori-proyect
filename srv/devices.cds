using { cuid } from '@sap/cds/common';

service ScaleService {
    entity ScaleData @readonly {
        key ID     : UUID;
        peso       : String;
        timestamp  : DateTime;
    }

    action pushPeso(peso: String);
}
