import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {Router} from "express-serve-static-core";
import {data} from './datasource/data'

export function runServer(port: number) {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.set("trust proxy", true);
    const router: Router = express.Router();

    router.get(
        "/description/:id",
        (req, res) => {
            const id = Number.parseInt(req.params.id);
            const article = data.filter(article => article.id === id)[0];

            res.send(article.description);
        }
    );

    router.get(
        "/:id",
        (req, res) => {
            const id = Number.parseInt(req.params.id);

            res.send(data.map(article => ({
                id: article.id,
                img: article.img,
                name: article.name,
                first_paragraph: article.first_paragraph,
                description: article.id === id ? article.description : ''
            })));
        }
    );

    app.use("/", router);

    app.listen(port, () => {
        console.log(`Server listener is up on port ${port} 🚀
             _     _
           /   \\ /   \\
          |     /     |
           \\ _ / \\ _ /
    `);
    });
}
