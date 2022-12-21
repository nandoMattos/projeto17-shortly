--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "originalUrl" text NOT NULL,
    "shortenUrl" character varying(50) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date NOT NULL,
    CONSTRAINT "urls_visitCount_check" CHECK (("visitCount" >= 0))
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(200) NOT NULL,
    "createdAt" date NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 1, 'https://www.youtube.com/watch?v=hi84Rw2piqg&list=RDhi84Rw2piqg&index=1', '7z0ZnF3D2LA09xVugoZlb', 0, '2022-12-20');
INSERT INTO public.urls VALUES (1, 1, 'https://www.youtube.com/watch?v=t0i4QRGDTbc&list=RDhi84Rw2piqg&index=9', '4hPHMm69eL95CgAbLy-LB', 5, '2022-12-20');
INSERT INTO public.urls VALUES (3, 2, 'https://www.youtube.com/watch?v=5GJWxDKyk3A&list=RDhi84Rw2piqg&index=2', '-yRH0KsWVxOF_2MRHaG83', 7, '2022-12-21');
INSERT INTO public.urls VALUES (4, 3, 'https://www.youtube.com/watch?v=qVdPh2cBTN0&list=RDhi84Rw2piqg&index=3', 'Ii3WwMMG_3qcfVnb3-Jdm', 0, '2022-12-21');
INSERT INTO public.urls VALUES (5, 3, 'https://www.youtube.com/watch?v=MwpMEbgC7DA&list=RDhi84Rw2piqg&index=4', 'gXEosIQ13oJq93kDE2_su', 0, '2022-12-21');
INSERT INTO public.urls VALUES (6, 3, 'https://www.youtube.com/watch?v=8UVNT4wvIGY&list=RDhi84Rw2piqg&index=6', 'Z0RHg9klapGt4VVryzvdN', 0, '2022-12-21');
INSERT INTO public.urls VALUES (7, 3, 'https://www.youtube.com/watch?v=YthChN1Wq8M&list=RDhi84Rw2piqg&index=19', 'ncOlAYcOdG-NoYznl-nEa', 0, '2022-12-21');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'nando', 'seila@seila.com', '$2b$10$SmnpfVNHAck7SltP3EuOXeT.ZMYSRUHw/7dVQVAFTpoKcvbhAaDYa', '2022-12-20');
INSERT INTO public.users VALUES (2, 'joao', 'joao@joao.com', '$2b$10$Ggk3ENAPJEpLx22IfcAijOApqK6nRnzK/VSUtxf2zrFzXbNW/Xtfa', '2022-12-21');
INSERT INTO public.users VALUES (3, 'joana', 'joana@joana.com', '$2b$10$C5Y2Op1LLLq8bdwVyHscH.a.iGeah7ZE5LAhwziVMtsKgdaOtJznW', '2022-12-21');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

