from flask_cors import CORS,cross_origin
import flask
import time
import os
import subprocess

app = flask.Flask(__name__)

def convertImage2String(inputFile):
  with open(inputFile, 'rb') as imageFile:
      result = base64.b64encode(imageFile.read()).decode('utf-8')
      return result

@app.route("/generateCustom", methods=["POST"])
@cross_origin()
def generateImageFromPoem():
    results = {'success': False}
    poem = flask.request.form['poem']

    poem = poem.replace("\n","")
    caption_path = "../AttnGAN/data/coco/example_captions.txt"
    with open(caption_path,"w") as o:
        o.write(poem)

    subprocess.call("python ../AttnGAN/code/main.py --cfg ../AttnGAN/code/cfg/eval_coco.yml --gpu 0")

    generated_image_path = "../AttnGAN/models/coco_AttnGAN2/example_captions/0_s_0_g2.png"

    results['imagestr'] = convertImage2String(generated_image_path)
    results['success'] = True
    time.sleep(3)
    return flask.jsonify(results)

@app.route("/getArt", methods=["POST"])
@cross_origin()
def getArt():
    results = {'success': False}
    poemId = flask.request.form['poemId']

    print(poemId)

    results['success'] = True
    time.sleep(3)
    return flask.jsonify(results)

if __name__ == "__main__":
  app.run()
