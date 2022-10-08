import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Help() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1>Help</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Help</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12 justify-content-center">
            <section className="section faq">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card basic">
                    <div className="card-body">
                      <h5 className="card-title">Basic Questions</h5>

                      <div>
                        <h6>
                          1. Nisi ut ut exercitationem voluptatem esse sunt
                          rerum?
                        </h6>
                        <p>
                          Saepe perspiciatis ea. Incidunt blanditiis enim
                          mollitia qui voluptates. Id rem nulla tenetur nihil in
                          unde rerum. Quae consequatur placeat qui cumque earum
                          eius omnis quos.
                        </p>
                      </div>

                      <div className="pt-2">
                        <h6>2. Reiciendis dolores repudiandae?</h6>
                        <p>
                          Id ipsam non ut. Placeat doloremque deserunt quia
                          tenetur inventore laboriosam dolores totam odio.
                          Aperiam incidunt et. Totam ut quos sunt atque modi
                          molestiae dolorem.
                        </p>
                      </div>

                      <div className="pt-2">
                        <h6>
                          3. Qui qui reprehenderit ut est illo numquam
                          voluptatem?
                        </h6>
                        <p>
                          Enim inventore in consequuntur ipsam voluptatem
                          consequatur beatae. Nostrum consequuntur voluptates et
                          blanditiis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Deserunt ut unde corporis</h5>

                      <div
                        className="accordion accordion-flush"
                        id="faq-group-2"
                      >
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              data-bs-target="#faqsTwo-1"
                              type="button"
                              data-bs-toggle="collapse"
                            >
                              Cumque voluptatem recusandae blanditiis?
                            </button>
                          </h2>
                          <div
                            id="faqsTwo-1"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faq-group-2"
                          >
                            <div className="accordion-body">
                              Ut quasi odit odio totam accusamus vero eius.
                              Nostrum asperiores voluptatem eos nulla ab dolores
                              est asperiores iure. Quo est quis praesentium aut
                              maiores. Corrupti sed aut expedita fugit vero
                              dolorem. Nemo rerum sapiente. A quaerat
                              dignissimos.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              data-bs-target="#faqsTwo-2"
                              type="button"
                              data-bs-toggle="collapse"
                            >
                              Provident beatae eveniet placeat est aperiam
                              repellat adipisci?
                            </button>
                          </h2>
                          <div
                            id="faqsTwo-2"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faq-group-2"
                          >
                            <div className="accordion-body">
                              In minus quia impedit est quas deserunt deserunt
                              et. Nulla non quo dolores minima fugiat aut saepe
                              aut inventore. Qui nesciunt odio officia beatae
                              iusto sed voluptatem possimus quas. Officia vitae
                              sit voluptatem nostrum a.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              data-bs-target="#faqsTwo-3"
                              type="button"
                              data-bs-toggle="collapse"
                            >
                              Minus aliquam modi id reprehenderit nihil?
                            </button>
                          </h2>
                          <div
                            id="faqsTwo-3"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faq-group-2"
                          >
                            <div className="accordion-body">
                              Voluptates magni amet enim perspiciatis atque
                              excepturi itaque est. Sit beatae animi incidunt
                              eum repellat sequi ea saepe inventore. Id et vel
                              et et. Nesciunt itaque corrupti quia ducimus.
                              Consequatur maiores voluptatum fuga quod ut non
                              fuga.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              data-bs-target="#faqsTwo-4"
                              type="button"
                              data-bs-toggle="collapse"
                            >
                              Quaerat qui est iusto asperiores qui est
                              reiciendis eos et?
                            </button>
                          </h2>
                          <div
                            id="faqsTwo-4"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faq-group-2"
                          >
                            <div className="accordion-body">
                              Numquam ut reiciendis aliquid. Quia veritatis
                              quasi ipsam sed quo ut eligendi et non. Doloremque
                              sed voluptatem at in voluptas aliquid dolorum.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              data-bs-target="#faqsTwo-5"
                              type="button"
                              data-bs-toggle="collapse"
                            >
                              Laboriosam asperiores eum?
                            </button>
                          </h2>
                          <div
                            id="faqsTwo-5"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faq-group-2"
                          >
                            <div className="accordion-body">
                              Aut necessitatibus maxime quis dolor et. Nihil
                              laboriosam molestiae qui molestias placeat
                              corrupti non quo accusamus. Nemo qui quis harum
                              enim sed. Aliquam molestias pariatur delectus
                              voluptas quidem qui rerum id quisquam.
                              Perspiciatis voluptatem voluptatem eos. Vel aut
                              minus labore at rerum eos.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Help;
