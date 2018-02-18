#################################################
# Flask Routes
#################################################
# import necessary libraries
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)



# Flask Setup
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/names")
def names():
    names=pd.read_csv('Belly_Button_Biodiversity_Metadata.csv')
    names = names[['SAMPLEID']]
    names['ID']= "BB_"+ names['SAMPLEID'].astype(str)

    names = names.drop(["SAMPLEID"],axis=1)
    names = names["ID"].tolist()
    names

    return jsonify(names)



@app.route('/otu')
def otu():
#Otu_id csv to df. Included entire csv
    BBB_otuid = pd.read_csv('Belly_Button_Biodiversity_otu_id.csv')
# To dictionary
    BBB_otuid_list= BBB_otuid['lowest_taxonomic_unit_found'].tolist()
    BBB_otuid_list

   

    return jsonify(BBB_otuid_list)


@app.route('/metadata/<samples>')
def metadata(samples):
    #Metadata csv read in. 
    B_B_B_Metadata_df=pd.read_csv('Belly_Button_Biodiversity_Metadata.csv')

#created new DF containing 5/23 fields needed
    B_B_B_Metadata_df = B_B_B_Metadata_df[['SAMPLEID','ETHNICITY','GENDER','AGE','BBTYPE', 'LOCATION']]
#make index = BB_sample id format
    B_B_B_Metadata_df['ID']= "BB_"+ B_B_B_Metadata_df['SAMPLEID'].astype(str)
#to dictionary format
    B_B_B_Metadata_df = B_B_B_Metadata_df.set_index('ID').to_dict('index')
    data = B_B_B_Metadata_df [samples]
   

    return jsonify(data)


@app.route('/wfreq/<sample>')
def wfreq(sample):
    #from metadata csv reduced to washing frequency
    washingfreq_df = pd.read_csv('Belly_Button_Biodiversity_Metadata.csv')
    washingfreq_df = washingfreq_df[['SAMPLEID', 'WFREQ']]
    washingfreq_df['ID'] = 'BB_' + washingfreq_df['SAMPLEID'].astype(str)
    washingfreq_df = washingfreq_df.drop(['SAMPLEID'], axis=1)
    washingfreq_df = washingfreq_df.set_index('ID').to_dict('index')
    washingfreq_df = washingfreq_df[sample]

    return jsonify(washingfreq_df)

@app.route('/samples/<sample>')
def samples(sample):
 # samples csv containing otu_id count by participant. Need number of samples by OTU-id 
    BBB_samples = pd.read_csv('belly_button_biodiversity_samples.csv')
    BBB_samples = BBB_samples[['otu_id',sample]].sort_values(sample, ascending=0)
    BBB_samples.columns = ['otu_id', "sample_values"]
    BBB_samples = BBB_samples.fillna(0)
    

   
    

    return jsonify( BBB_samples.to_dict('list'))


if __name__ == "__main__":
    app.run(debug=True) # remove if in production!!!!



