import React from "react";

class GlobalsModel{
    fields = {
        'Vineyard Id':{name:'Vineyard Id',type:'text', description:''},
        'Vineyard':{name:'Vineyard',type:'text', description:''},
        'Variety':{name:'Variety',type:'text', description:''},
        'Region':{name:'Region',type:'text', description:''},
        'City':{name:'City',type:'text', description:''},
        'Parcel ID':{name:'Parcel ID',type:'text', description:''},
        'Sample collection day':{name:'Sample collection day',type:'text', description:''},
        'Sample':{name:'Sample',type:'text', description:''},
        'pH':{name:'pH',type:'text', description:''},
        'Refractive index':{name:'Refractive index',type:'text', description:''},
        'Total microbial count':{name:'Total microbial count',type:'text', description:''},
        'Yeasts and moulds':{name:'Yeasts and moulds',type:'text', description:''},
        'Antioxidant activity DPPH (μg/mL trolox)':{name:'Antioxidant activity DPPH (μg/mL trolox)',type:'text', description:''},
        'Antioxidant activity ABTS (μg/mL trolox)':{name:'Antioxidant activity ABTS (μg/mL trolox)',type:'text', description:''},
        'Total phenolic content, TPC (μg/mL gallic acid)':{name:'Total flavonoid content, TFC (μg/mL quercetin',type:'text', description:''},
        'Total flavonoid content, TFC (μg/mL quercetin':{name:'Total flavonoid content, TFC (μg/mL quercetin',type:'text', description:''},
        'Toxicity on skin cells (MTT assay)':{name:'Toxicity on skin cells (MTT assay)',type:'text', description:''},
        'Gene expression (SIRT1) on skin cells':{name:'Gene expression (SIRT1) on skin cells',type:'text', description:''},
        'Extraction Method':{name:'Extraction Method',type:'extraction', description:''}
    };
}

export default GlobalsModel;