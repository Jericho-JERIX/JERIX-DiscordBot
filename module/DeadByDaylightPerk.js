var dbdMetaPerk = {
    anurse: "<:nursecall:747043135674253442> A NURSE'S CALLING",
    bam: "<:bam:747014963251642399> BAMBOOZLE",
    bbq: "<:bbq:747045917512695859> BARBEQUE AND CHILLI",
    ci: "<:ci:747015831262855229> CORRUPTED INTERVENTION",
    dis: "<:discordance:747043134713626705> DISCORDANCE",
    endur: "<:endure:747084575548637235> ENDURING",
    hRet: "<:retribution:747043134600380476> HEX: RETRIBUTION",
    hRuin: "<:ruin:747084698110525501> HEX: RUIN",
    hUd: "HEX: UNDYING",
    infect: "<:infectfright:747014962412781638> INFECTIOUS FRIGHT",
    ironmai: "<:iron_maiden:747104292837523467> IRON MAIDEN",
    monitor: "<:monitor_abuse:747043136563445800> MONITOR & ABUSE",
    pop: "<:pop:747015359604981801> POP GOES THE WEASEL",
    slop: "<:sloppy_butcher:747043133635952711> SLOPPY BUTCHER",
    stb: "<:stbfl:747013728658259975> SAVE THE BEST FOR LAST",
    stri: "<:stridor:747084573241770045> STRIDOR",
    surge: "<:surge:747043135716327425> SURGE",
    surv: "<:surveillance:747043135590498304> SURVEILLANCE",
    thana: "<:thana:747096521698443284> THANATOPHOBIA",
    tot: "<:trailoftorment:747084574726684672> TRAIL OF TORMENT",
    tt: "<:thrilling:747015357499441174> THRILLING TREMOR",
}

var dbdKillerPerk= {
    trapper: {
        killer: "The Trapper",
        perk: [dbdMetaPerk.stb,dbdMetaPerk.tt,dbdMetaPerk.pop,dbdMetaPerk.ci]
    },
    wraith: {
        killer: "The Wraith",
        perk: [dbdMetaPerk.anurse,dbdMetaPerk.tt,dbdMetaPerk.pop,dbdMetaPerk.ci]
    },
    hillbilly: {
        killer: "The Hillbilly",
        perk: [dbdMetaPerk.infect,dbdMetaPerk.bbq,dbdMetaPerk.hRuin,dbdMetaPerk.ci]
    },
    nurse: {
        killer: "The Nurse",
        perk: [dbdMetaPerk.infect,dbdMetaPerk.bbq,dbdMetaPerk.pop,dbdMetaPerk.ci]
    },
    huntress: {
        killer: "The Huntress",
        perk: [dbdMetaPerk.ironmai,dbdMetaPerk.bbq,dbdMetaPerk.pop,dbdMetaPerk.ci]
    },
    shape: {
        killer: "The Shape",
        perk: [dbdMetaPerk.surv,dbdMetaPerk.pop,dbdMetaPerk.surge,dbdMetaPerk.ci]
    },
    hag: {
        killer: "The Hag",
        perk: [dbdMetaPerk.anurse,dbdMetaPerk.monitor,dbdMetaPerk.slop,dbdMetaPerk.ci]
    },
    doctor: {
        killer: "The Doctor",
        perk: [dbdMetaPerk.stb,dbdMetaPerk.pop,dbdMetaPerk.surge,dbdMetaPerk.dis]
    },
    cannibal: {
        killer: "The Cannibal",
        perk: [dbdMetaPerk.bbq,dbdMetaPerk.pop,dbdMetaPerk.bam,dbdMetaPerk.ci]
    },
    nightmare: {
        killer: "The Nightmare",
        perk: [dbdMetaPerk.pop,dbdMetaPerk.tt,dbdMetaPerk.dis,dbdMetaPerk.ci]
    },
    pig: {
        killer: "The Pig",
        perk: [dbdMetaPerk.stb,dbdMetaPerk.surv,dbdMetaPerk.pop,dbdMetaPerk.surge]
    },
    clown: {
        killer: "The Clown",
        perk: [dbdMetaPerk.stb,dbdMetaPerk.pop,dbdMetaPerk.dis,dbdMetaPerk.surge]
    },
    spirit: {
        killer: "The Spirit",
        perk: [dbdMetaPerk.tt,dbdMetaPerk.pop,dbdMetaPerk.stri,dbdMetaPerk.ci]
    },
    legion: {
        killer: "The Legion",
        perk: [dbdMetaPerk.tt,dbdMetaPerk.pop,dbdMetaPerk.thana,dbdMetaPerk.surge]
    },
    plague: {
        killer: "The Plague",
        perk: [dbdMetaPerk.hRuin,dbdMetaPerk.infect,dbdMetaPerk.hRet,dbdMetaPerk.dis]
    },
    ghostface: {
        killer: "The Ghostface",
        perk: [dbdMetaPerk.anurse,dbdMetaPerk.bbq,dbdMetaPerk.pop,dbdMetaPerk.ci]
    },
    demogorgon: {
        killer: "The Demogorgon",
        perk: [dbdMetaPerk.stb,dbdMetaPerk.tt,dbdMetaPerk.pop,dbdMetaPerk.ci]
    },
    oni: {
        killer: "The Oni",
        perk: [dbdMetaPerk.monitor,dbdMetaPerk.bbq,dbdMetaPerk.pop,dbdMetaPerk.infect]
    },
    deathslinger: {
        killer: "The Deathslinger",
        perk: [dbdMetaPerk.monitor,dbdMetaPerk.bbq,dbdMetaPerk.slop,dbdMetaPerk.ci]
    },
    executioner: {
        killer: "The Executioner",
        perk: [dbdMetaPerk.pop,dbdMetaPerk.anurse,dbdMetaPerk.dis,dbdMetaPerk.ci]
    },
    blight: {
        killer: "The Blight",
        perk: [dbdMetaPerk.hRuin,dbdMetaPerk.hUd,dbdMetaPerk.surv,dbdMetaPerk.dis]
    }
}

module.exports = {
    dbdKillerPerk
}