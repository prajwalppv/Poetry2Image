from flask_cors import CORS,cross_origin
import flask
import time
import os
import base64
from flask_mail import Mail, Message

app = flask.Flask(__name__)
mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'artML2019',
    "MAIL_PASSWORD": 'testabc123'
}

app.config.update(mail_settings)
mail = Mail(app)

def convertImage2String(inputFile):
  with open(inputFile, 'rb') as imageFile:
      result = base64.b64encode(imageFile.read()).decode('utf-8')
      return result

@app.route("/generateCustom", methods=["POST"])
@cross_origin()
def generateImageFromPoem():
    results = {'success': False}
    # print("here")
    # print(os.getcwd())
    poem = flask.request.form['poem']

    poem = poem.replace("\n","")
    caption_path = "../data/coco/example_captions.txt"
    with open(caption_path, "w") as o:
        o.write(poem)

    os.system("python main.py --cfg cfg/eval_coco.yml --gpu 0")
    # time.sleep(10)

    generated_image_path = "../models/coco_AttnGAN2/example_captions/0_s_0_g2.png"
    results['imagestr'] = convertImage2String(generated_image_path)

    results['success'] = True
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

@app.route("/sendEmail", methods=["POST"])
@cross_origin()
def sendEmail():
    results = {'success': False}
    email = flask.request.form['email']
    choice = flask.request.form['choice']
    poem = flask.request.form['poem']

    # TODO : get existing poem in case choice=='auto'
    if choice == 'auto':
        pass

    msg_body =  """
                    Here is your generated art from ArtForML Spring 2019 exhibition! Cheers!\n
                    The poem you chose was : {0}\n

                    Thank you,\n
                    Prajwal Prakash Vasisht\n
                    Sunil Kumar\n
                    Yashovardhan Charturvedi
                """.format(poem)


    with app.app_context():
        msg = Message(subject="Generated ART",
                      sender=app.config.get("MAIL_USERNAME"),
                      recipients=[email],
                      body=msg_body)

    with app.open_resource("../models/coco_AttnGAN2/example_captions/0_s_0_g2.png") as fp:
        msg.attach("image.png", "image/png", fp.read())

    mail.send(msg)
    results['success'] = True
    return flask.jsonify(results)

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000)
