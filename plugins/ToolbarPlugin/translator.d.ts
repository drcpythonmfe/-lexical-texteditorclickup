declare const LANGUAGES: {
    auto: string;
    af: string;
    sq: string;
    am: string;
    ar: string;
    hy: string;
    az: string;
    eu: string;
    be: string;
    bn: string;
    bs: string;
    bg: string;
    ca: string;
    ceb: string;
    ny: string;
    zh: string;
    co: string;
    hr: string;
    cs: string;
    da: string;
    nl: string;
    en: string;
    eo: string;
    et: string;
    tl: string;
    fi: string;
    fr: string;
    fy: string;
    gl: string;
    ka: string;
    de: string;
    el: string;
    gu: string;
    ht: string;
    ha: string;
    haw: string;
    iw: string;
    hi: string;
    hmn: string;
    hu: string;
    is: string;
    ig: string;
    id: string;
    ga: string;
    it: string;
    ja: string;
    jw: string;
    kn: string;
    kk: string;
    km: string;
    ko: string;
    ku: string;
    ky: string;
    lo: string;
    la: string;
    lv: string;
    lt: string;
    lb: string;
    mk: string;
    mg: string;
    ms: string;
    ml: string;
    mt: string;
    mi: string;
    mr: string;
    mn: string;
    my: string;
    ne: string;
    no: string;
    ps: string;
    fa: string;
    pl: string;
    pt: string;
    pa: string;
    ro: string;
    ru: string;
    sm: string;
    gd: string;
    sr: string;
    st: string;
    sn: string;
    sd: string;
    si: string;
    sk: string;
    sl: string;
    so: string;
    es: string;
    su: string;
    sw: string;
    sv: string;
    tg: string;
    ta: string;
    te: string;
    th: string;
    tr: string;
    uk: string;
    ur: string;
    uz: string;
    vi: string;
    cy: string;
    xh: string;
    yi: string;
    yo: string;
    zu: string;
};
declare type TranslationResult = {
    translatedText: string;
    detectedSourceLang?: string;
};
declare function translateText(text: string, targetLang: string, sourceLang?: string): Promise<{
    translatedText: string;
    detectedLanguage: any;
    confidence: any;
}>;
declare function example(): Promise<void>;
declare function translateTexts(text: string, targetLang: string, sourceLang?: string): Promise<any>;
export { LANGUAGES, translateText, example, translateTexts, TranslationResult };
