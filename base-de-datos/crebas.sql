
/*==============================================================*/
/* Table: APODERADO                                             */
/*==============================================================*/
create table APODERADO 
(
   ID_APODERADO         integer                        not null AUTO_INCREMENT,
   NOMBRE_APODERADO     char(15)                       not null,
   APELLIDO1_APODERADO  char(15)                       not null,
   APELLIDO2_APODERADO  char(15)                       not null,
   CORREO_APODERADO     varchar(35)                    not null,
   NUMERO_APODERADO     varchar(12)                    not null,
   APODERADO_EMERGENCIA char(15)                       not null,
   NUMERO_EMERGENCIA    varchar(12)                    not null,
   constraint PK_APODERADO primary key (ID_APODERADO)
);

/*==============================================================*/
/* Index: APODERADO_PK                                          */
/*==============================================================*/
create unique index APODERADO_PK on APODERADO (
ID_APODERADO ASC
);

/*==============================================================*/
/* Table: ASIGNATURA                                            */
/*==============================================================*/
create table ASIGNATURA 
(
   ID_ASIGNATURA        integer                        not null AUTO_INCREMENT,
   NOMBRE_ASIGNATURA    varchar(15)                    not null,
   constraint PK_ASIGNATURA primary key (ID_ASIGNATURA)
);

/*==============================================================*/
/* Index: ASIGNATURA_PK                                         */
/*==============================================================*/
create unique index ASIGNATURA_PK on ASIGNATURA (
ID_ASIGNATURA ASC
);

/*==============================================================*/
/* Table: CURSO                                                 */
/*==============================================================*/
create table CURSO 
(
   ID_CURSO             integer                        not null AUTO_INCREMENT,
   NOMBRE_CURSO         varchar(15)                    not null,
   constraint PK_CURSO primary key (ID_CURSO)
);

/*==============================================================*/
/* Index: CURSO_PK                                              */
/*==============================================================*/
create unique index CURSO_PK on CURSO (
ID_CURSO ASC
);

/*==============================================================*/
/* Table: ESTUDIANTE                                            */
/*==============================================================*/
create table ESTUDIANTE 
(
   ID_ESTUDIANTE        integer                        not null AUTO_INCREMENT,
   ID_CURSO             integer                        not null,
   ID_APODERADO         integer                        not null,
   NOMBRE_ESTUDIANTE    char(15)                       not null,
   APELLIDO1_ESTUDIANTE char(15)                       not null,
   APELLIDO2_ESTUDIANTE char(15)                       not null,
   RUT_ESTUDIANTE       varchar(14)                    not null,
   CURSO                varchar(5)                     not null,
   constraint PK_ESTUDIANTE primary key (ID_ESTUDIANTE)
);

/*==============================================================*/
/* Index: ESTUDIANTE_PK                                         */
/*==============================================================*/
create unique index ESTUDIANTE_PK on ESTUDIANTE (
ID_ESTUDIANTE ASC
);

/*==============================================================*/
/* Index: PERTENECE_A_FK                                        */
/*==============================================================*/
create index PERTENECE_A_FK on ESTUDIANTE (
ID_CURSO ASC
);

/*==============================================================*/
/* Index: ES_REPRESENTADO_POR_FK                                */
/*==============================================================*/
create index ES_REPRESENTADO_POR_FK on ESTUDIANTE (
ID_APODERADO ASC
);

/*==============================================================*/
/* Table: IMPARTE                                               */
/*==============================================================*/
create table IMPARTE 
(
   ID_IMPARTE           integer                        not null AUTO_INCREMENT,
   ID_CURSO             integer                        not null,
   ID_USUARIO           integer                        not null,
   constraint PK_IMPARTE primary key (ID_IMPARTE)
);

/*==============================================================*/
/* Index: IMPARTE2_FK                                           */
/*==============================================================*/
create index IMPARTE2_FK on IMPARTE (
ID_USUARIO ASC
);

/*==============================================================*/
/* Index: ES_IMPARTIDO_POR_FK                                   */
/*==============================================================*/
create index ES_IMPARTIDO_POR_FK on IMPARTE (
ID_CURSO ASC
);

/*==============================================================*/
/* Table: INCLUYE                                               */
/*==============================================================*/
create table INCLUYE 
(
   ID_INCLUYE           integer                        not null AUTO_INCREMENT,
   ID_CURSO             integer                        not null,
   ID_ASIGNATURA        integer                        not null,
   constraint PK_INCLUYE primary key (ID_INCLUYE)
);

/*==============================================================*/
/* Index: INCLUYE2_FK                                           */
/*==============================================================*/
create index INCLUYE2_FK on INCLUYE (
ID_ASIGNATURA ASC
);

/*==============================================================*/
/* Index: INCLUYE_FK                                            */
/*==============================================================*/
create index INCLUYE_FK on INCLUYE (
ID_CURSO ASC
);

/*==============================================================*/
/* Table: OBSERVACIONES                                         */
/*==============================================================*/
create table OBSERVACIONES 
(
   ID_OBSERVACIONES     integer                        not null AUTO_INCREMENT,
   ID_ESTUDIANTE        integer                        not null,
   ID_USUARIO           integer                        not null,
   OBSERVACION          varchar(300)                   not null,
   constraint PK_OBSERVACIONES primary key (ID_OBSERVACIONES)
);

/*==============================================================*/
/* Index: OBSERVACIONES2_FK                                     */
/*==============================================================*/
create index OBSERVACIONES2_FK on OBSERVACIONES (
ID_USUARIO ASC
);

/*==============================================================*/
/* Index: RECIBE_OBSERVACIONES_FK                               */
/*==============================================================*/
create index RECIBE_OBSERVACIONES_FK on OBSERVACIONES (
ID_ESTUDIANTE ASC
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO 
(
   ID_USUARIO           integer                        not null AUTO_INCREMENT,
   NOMBRE_USUARIO       char(15)                       not null,
   APELLIDO1_USUARIO    char(15)                       not null,
   APELLIDO2_USUARIO    char(15)                       not null,
   CORREO_USUARIO       varchar(35)                    not null,
   RUT_USUARIO          varchar(14)                    not null,
   TIPO_USUARIO         char(20)                       not null,
   constraint PK_USUARIO primary key (ID_USUARIO)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
ID_USUARIO ASC
);

alter table ESTUDIANTE
   add constraint FK_ESTUDIAN_ES_REPRES_APODERAD foreign key (ID_APODERADO)
      references APODERADO (ID_APODERADO)
      on update restrict
      on delete restrict;

alter table ESTUDIANTE
   add constraint FK_ESTUDIAN_PERTENECE_CURSO foreign key (ID_CURSO)
      references CURSO (ID_CURSO)
      on update restrict
      on delete restrict;

alter table IMPARTE
   add constraint FK_IMPARTE_ES_IMPART_CURSO foreign key (ID_CURSO)
      references CURSO (ID_CURSO)
      on update restrict
      on delete restrict;

alter table IMPARTE
   add constraint FK_IMPARTE_IMPARTE2_USUARIO foreign key (ID_USUARIO)
      references USUARIO (ID_USUARIO)
      on update restrict
      on delete restrict;

alter table INCLUYE
   add constraint FK_INCLUYE_INCLUYE_CURSO foreign key (ID_CURSO)
      references CURSO (ID_CURSO)
      on update restrict
      on delete restrict;

alter table INCLUYE
   add constraint FK_INCLUYE_INCLUYE2_ASIGNATU foreign key (ID_ASIGNATURA)
      references ASIGNATURA (ID_ASIGNATURA)
      on update restrict
      on delete restrict;

alter table OBSERVACIONES
   add constraint FK_OBSERVAC_OBSERVACI_USUARIO foreign key (ID_USUARIO)
      references USUARIO (ID_USUARIO)
      on update restrict
      on delete restrict;

alter table OBSERVACIONES
   add constraint FK_OBSERVAC_RECIBE_OB_ESTUDIAN foreign key (ID_ESTUDIANTE)
      references ESTUDIANTE (ID_ESTUDIANTE)
      on update restrict
      on delete restrict;

