import rankingRepository from "../repositories/rankingRepository.js";

export async function getRanking(req, res) {
  try {
    const linksCount = await rankingRepository.getRanking();

    res.status(200).send(
      linksCount.rows.map((u) => {
        return {
          id: u.id,
          name: u.name,
          linksCount: Number(u.linksCount),
          visitCount: Number(u.visitCount),
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
