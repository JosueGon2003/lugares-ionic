PGDMP     (    &                }            LugaresDBIonic    15.8    15.8                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17013    LugaresDBIonic    DATABASE     �   CREATE DATABASE "LugaresDBIonic" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
     DROP DATABASE "LugaresDBIonic";
                postgres    false            �            1259    17014    comentarios    TABLE     �   CREATE TABLE public.comentarios (
    id integer NOT NULL,
    lugar_id integer NOT NULL,
    name character varying(50) NOT NULL,
    comentario text NOT NULL
);
    DROP TABLE public.comentarios;
       public         heap    postgres    false            �            1259    17019    comentarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.comentarios_id_seq;
       public          postgres    false    214                       0    0    comentarios_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;
          public          postgres    false    215            �            1259    17020    lugares    TABLE     �   CREATE TABLE public.lugares (
    id integer NOT NULL,
    titulo character varying(100) NOT NULL,
    imagen text NOT NULL,
    comentarios text DEFAULT ''::text
);
    DROP TABLE public.lugares;
       public         heap    postgres    false            �            1259    17026    lugares_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lugares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lugares_id_seq;
       public          postgres    false    216                       0    0    lugares_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lugares_id_seq OWNED BY public.lugares.id;
          public          postgres    false    217            �            1259    17027    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(10) NOT NULL,
    email character varying(255),
    phone character varying(20),
    first_name character varying(50),
    last_name character varying(50),
    city character varying(100),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('user'::character varying)::text])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17031    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            o           2604    17032    comentarios id    DEFAULT     p   ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);
 =   ALTER TABLE public.comentarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            p           2604    17033 
   lugares id    DEFAULT     h   ALTER TABLE ONLY public.lugares ALTER COLUMN id SET DEFAULT nextval('public.lugares_id_seq'::regclass);
 9   ALTER TABLE public.lugares ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            r           2604    17034    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218                      0    17014    comentarios 
   TABLE DATA           E   COPY public.comentarios (id, lugar_id, name, comentario) FROM stdin;
    public          postgres    false    214   �                 0    17020    lugares 
   TABLE DATA           B   COPY public.lugares (id, titulo, imagen, comentarios) FROM stdin;
    public          postgres    false    216   \                 0    17027    users 
   TABLE DATA           h   COPY public.users (id, username, password, role, email, phone, first_name, last_name, city) FROM stdin;
    public          postgres    false    218   �l                  0    0    comentarios_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.comentarios_id_seq', 42, true);
          public          postgres    false    215                       0    0    lugares_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.lugares_id_seq', 47, true);
          public          postgres    false    217                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    219            u           2606    17039    comentarios comentarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_pkey;
       public            postgres    false    214            w           2606    17041    lugares lugares_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.lugares
    ADD CONSTRAINT lugares_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.lugares DROP CONSTRAINT lugares_pkey;
       public            postgres    false    216            y           2606    17043    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            {           2606    17045    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    218            |           2606    17046 %   comentarios comentarios_lugar_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_lugar_id_fkey FOREIGN KEY (lugar_id) REFERENCES public.lugares(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_lugar_id_fkey;
       public          postgres    false    216    214    3191               m   x��Q
�0C��S��MҲ���IIü�����l�0�S���B�����8��.�;�D���AZ-���T�"-4{ݼ��<���2�i�>� G���3=3^7 '��%F            x���W�̖%>�������<�-��z�z�=���b�[]���� ��d�{��N�L�oƞ/���:�Vm۴���g��ڪ�O������l�k��ʳ��ӱ�@�u���9�^�Zm}qg���]��OQo���A�?�������n�_i��_k_o�:u<�q�W�gu������>~�!>�?��/��y�nR��G)�W�"�_H�������N�1N�P�>����(��s3��_������:{7�����w��e��������0�}���-��n�\{[�[������!�c�U�����������{��o�w��?��8�}���t��+�}��8[?0? ���[��v�i<�%�_F5n�Z��?�_����[�|��,^���[���w��O3�����k�!��C6��L��d��hʤ޳wO��d8�j��L���Ϟ�(�-&{�[�r}�r=�
C�.K�;�r=��*�n�Fv�"�ն�]nj��L9*l	�BE��v�n��)�?��������_���(�����Z|(��$J�h��h����X�?E%o�������ǔX�r���(|�Jej4m��{���w(�y��ҴTi��oo�ʬ�P�FG��N�O�m�M<ם{<Qa�ո���&=�c���]�4Ujm&ڷr�۾����ЦK���Y�%9�xr�mM���2G����#�R�����8�8YTm�����Fq��.B\���ٯ넄/��b=C��Z+�n�O�㨱(��Ǔ�ء�r>�%����Iuw�V�ϧV����%����n*��4"&mV�p�IU��̊��ʨ�ݭ�ƒ�Xf]f�w��
�7}�K.Qt��au�>vS���=oG��A��;�uzL�cyH!�8��#��,�F�c��sL���U7g�8�u�_]{�}z�.0g������Ѳ�>r~�p��W,��s�\������4�WQ�?�c�Z�	؈E�E�"�����90�Ίah��x��=΢MB&���?��J�h�!E]��q�S���9��|�h3�(˄�ë�S6�ȕ%�n���?����2�fa�8���{��mBVI}����x�O�2��$�7:��ێ����u��#�kΟ���:a�>gOk�N��I�����(����$[�h�5��4Ip����J^��ZQ:�5&?0�׾�j�d�sDI���e��5L*@�+&ak�:}����`Ѥ��/Q���W��\�̸�2�r1Dօ!��J��t`G�n��q�)8�?�O��xZ���l�,3���,������\m����R�ot"�s�.�m���!$)lk��E�\�����Ż�ŀf5<f}l��?3��MkIx��!]��u虷?'-ğI�^��zg���V�.۩��s�����OP$�j-�l)C�;N�w���|5I���||&���>W�M[|�D[A�Z[�k�Q�Q�Y�U��{��a7��H{�"��'|;���}R'v�5j��|������
{~��V;��Fw:	�_� (��ԩ�����CH+�!�� � T�j0p�;A2$Z��sEb��X�<��,�߰��>�8��h��Ǚ�� U,ڳ�^V�uw�U���m��6튏A�tw�?�jՏ�ͤ飹 �,��+A}ف�*�̨k'��M��Hz�G~�8ϋ�{sVSk˿�C�ڗ�_|O�Z��;�����^�Dbζ�Eb)B�䮪1��@�=Y����������i�����z�������ĭ��� ���0-�ܨB7�����&���r_{�������~i����'�)���Y������ ����+U�C( �p�j�j7�7ͷk?���K}�Q�@X#���O����?:Dȼ�Ғ�|�� ���I��e�g���D�ᇠb�T�ܛ���j#_$dJ4ȩK�>��X�΢���m$�6��]��U��[Wp?@v>� 	��H�j�5`"�[�[HANOL���*!�,|h��� U�Wi4R����G����e�� ��H�xЖ�'�qm�-~���B�B��F�l|�C����`�S��ŗ���>(x8���iݼD;�O	E�u涆Y��Έ��v(;V[kK��ۚ�Ε�E��vn�?N�T�ES�v0v޼F�J�yI�J���vh���?��l��ii�j��nh��Eܼ�Y{(8��(����+P���QOmf^����"N��aa��Fs�sF6��ɞU��N�5�6(QJ������o��gu�/G��*P Ѵ�AٙĎ��I�(�D�e2'����%_�}����e #��f����dW�?�tp�@��v�JJ$�&�x<(����o�� {����(�ؕO��7bu��$�bRʏd�w~	�M>·R�A�Uk��	h��W�&��9�\2�fr�8��O�Npsw} ԳA�ܪ`��~��j������ß�<�]�v#(�䴫�u�źقj5�V.�)�zjL���\Dߗ�όu�W�Ypa^:f��n	�k�o��w��p��
�4�g�Aw|�
5��螉��s�PN��P�0ާW�%$ u�����(	�kԡ�����E҆���lɔ�sz
P����;��)~���w�����T!���b덮�V�T
}���l����Ol��*��(ABHf��c�Ӛ{?Up+�D��4�($��8����y
Q��7$���ڤ\	Z!B�s���7��'�,lI�|3�ӂ�n���s��{�p/'�z=��� �|�Ʊ�ڷ���|$I*>NsL
c�#��<��Eo=�i��[�Lw��fxQ�M�~���S�H�m_�(l���;��l�%؉��q��EM�q�,$m�O�"iL�Z^�B��~�)��ZT�=+������"��j�j���:^N��E� ��+��d�J����b����;�#A����S߿.�S�����x�"�	�
Ay�/��=;�橤m�W���r���8�>����E�%��Ϸ��E
��s��I��\;H��C�xu6+�=���g��R7�Ӱ6S��#G���`�%��F����Ѐ�R�*!$���NS�ض���}���U�
��;�瓫FŬ��*kS�
���d7}�]�Tg��zo�&����{����PWğ�F�HCR�g7 8�*,��'2��K5�PdeK�HMS����9R���5q/���e�k���^�u8��}]<�9"�L��ij��Ʋ�7�����p��賆]m��xS��P������=��E��6������&�ݝ��/����H�6�ѫ���fh=�2��	�J�������DIգ�+{>-!����Q;�+JnK?����CV��*�|M:ևU�8{������Ñä���C����p5T�b��5�>t� iu� N%!��TPչM���� ��xF��X3�����p�39��bI�歾�E>�>��!�!,�dM"93z��s������K��$k������Sc�_��!�tw���dE����K'���Ͷ��q���� #-Uxf;�7�7$����u��`
e�&�7��i�{�q�U���E�~���&<��Y��6��?��c8���x��&6�;�Ui����œ��F��9.���H����D>:;/�D���:����Z����F;��B<�>�|4��]���"��7	��.Qna�y��:�WxN��M]�K��w����H��dE���cVK��ںk�/�䴇���lf���7z��'t�ͳ�=�"�9P���+5�R��8�
��%�W���bc�����)?�8���=������s�>�ħ�tg���IV���8"�=����A����+$��{�~�G��7�'�x�'!��o�2ܯ�ͦ��~t�d�wG��4��P����BC�3�G.F��GRv1ڦ���#{.��r-Y�����n$�|��y����zu],	%�]�I����ş�Ƶ����'��w���1�J���pn�U.M?�2����d��dq�0�KX�(e7��*���v�(���j��
�^��)F"�0�'D�Ϣ{@�    Y��8����>������U�3�V·���%������@�C"L�x�0J:k7��sgE�xd�7��-�����rkd�l�1$2-4 ���/����է�7?nвdI�߶+��hT��Av��VU�P�7��S�9��&�;��ڜ����i��d�g�- �Q�m�!�t���}U�]C.	��ǻ�H�8Ŧ�Ӧ�P���h�ߩ�$�~����oQ��K�%��b�rwk���2�.�<�'�l�mQM�T4/lc+V�i�M��m�j��i�.����c4��/wp���:W�w���^�L���"Tf��gE��4�F�h��ד2$�U$m6�G��ύ�n>*�+�F)R"D, q��� rC���ޜ�(�(��sg{|}��;���B[ч�7�4��
E�	ܧR�x�������M��p+�U^f�vn�n���}�}֤;W�S�r��+��JF�kh���㐤��xܛ�NH:��9	�]n]�>�S�'s���;0{�CǇ�����"��r̈�8ӂ�K��r�u+z�d�s=�ݖ�f��7ԣ�f���d��N���M����<0e��<��p���;����w��t�������_$�p�I�W�+������,������Kʑ�F��R��/'�Ī��}-�o"Z����;����<��hc� ���^�Js����Gpvß_����~�W2����؝[{�+�����?X7��?í:���c�є4?�&��	 ����ol��r���"'
�OR��+W�+N��2�3����������I���#������gò����9_ŉ�=g��!](�*��}sF�$Nv(��Cm�I��c$J�~b���jB>x�5����)�����/�vu���"vˁ�8>]�x��i�C:.;��'�mP��	�WԱvl�8������Dj�	3�ap$�A�nbym��"v��N� .�@{C'Rp����VgX��#< ��0^�Ggj�y�1aR_��xܿ+n��r�w\s�\~t]0�\hJ��T�L��JD-�����~z��,b���|���4c���x+Fr��\�g�3\�ȅ� ���Y�Q�/>���%F�5�T�떦}���:2��ڴ)s��`�>l�fD��h=��]c��E�-�4-z���v����B
P���_Υ�g�-f���H�|�e/�`����9�[�dJ��.U�R�#h��́'[�!�	�Σq��ھaJ}8%�?����4^U�]i�@���L/̜�������깊-����$]-���~�Y(�1�l8lC��!D__s���w�������dL��g�+�W��>_nB�N��5i��ZB�uHAn<؊�t����7���h+�5[4Wα�Sny�b�u%�d��(1mY�6;�⋬ �kO�Jv�_ulG���k��h�ʼ\J�bn/�����u~�
�z�>��Uh\"^��Q�����s!'6c3�=0Hz���$�[�ɥ��|�H���n�\:�*���5ɔ���(�V8��~вS{`�i):��xX�\�䨼FoC���J7R����Bo��u��Ia_Î��*������]�,;����˥/�/e����0�Ǫ����z,��q�8=�_V��!��v��!�o���4�pWL�T�@�|gp�����(t���5z�����UCZ�C��}�>���M�p��k>��h�E\��"<�n�/)�]�g�׈�Y���J�nI������]%����`mz�����+�¥�� *9��=���wɏZv��4��ޙ�mƔӖQ6�S��mjK[����J`i��l*�&!Ī����Trjn+�c���[i�1'aL��m�Vm-���gv�	[��7_��wu���Z�5UGZ��&��y��m"FI���0��u����@��.P�\)�ȡ��u֩z�+=��˕h[�FD�!��
#ɪ<�|n�y;���{�<�Znf�"	�'�Nɬ���튡�T�5��dJ�$��_Oa�2|���&M՞�g�m��폓kN�9���b��j_̔J+�*&���9�N��?kY����?�߿i�X��oV��}��<�?Y�F> ���%��|�O����_����oG��ߎ��_�,����{����GG��/�������W�?Ґ�?����_����������/�I���[�a���2�q��,_E��ʵ�K���t��4�4��h7�=��-_��{�J���r�#_Eb�����7y(����(%�R�'��#_��)��K��{�
��EqMiﵷ�G����U�;�'x��?y#���e$T�#3�e��&���6��H�ڄ�..=&j������[���P��/sZ�Ɯ�di3�(�m��o�Yϗ�~�kzU��-5
�fbE�㮜'�� �?�pu:*��A.V����+Kd+۾cYN��B����OnF-,Nga�^u��5����k��a}$���2�t����q������^���}}�,R`�<�{�u�̎������`�<kGT��8'R�k�.r�'_C	�ۤ�߈�(3kf;{��w]�57�h�3p�.��19g��=M�\K��I��˔ɖu荡$y���c.���0�"y�ŎnGS���FTα����>�Z9n<�2�MkJ��WJO�����	Vf�wڋ6�H=à�u]��,m�`h�8"jԓ���n�W����=��a0�3�~ˇ���OQ"p��M�sс%��|�Z��7ꖠ9��������e�Be�a�k�I��$��ذ��3��q,�g.���D0gq	I�}�,�$�'yT7Ր�@����xsf�H�C-P(1�pg�f�
릷�)Z�,Y҃��aE	%@؈DX�٬�&D�h�A��D��f"k�a����ɾ�E�dH�S�/��^-ښ/��Y��={�W��.�j��6Zs��ms���.�!RU����L��W�~�8��Cğ��_���π��4�Έ��y�9(�B.{)e�+��>��^�ίS�wZ���gR#Z(��KY�����BK�k^���`�
�d��Nr��
�B���5m�{nί[r�}���E����WH��'��P���}p$!Y[�J�_�ƭ\t �6�ɮ�� BlT��Y��M���EI�Y�T'�_�R-v�6m;�]��e\
�]GnTR��[��\��^�>N�V�B΂�Q\8���B����ԇ[�HOǅ��^�Bڲo����Z��(V0��ٟ�ӄz}1�!Q���IE^��K4D�Q4���x^����GlƘ$�~�*�#���F�XpgQ7�Ym&�~�s��f�Pi�����*�����#)�A���28�H�E��հҗh�4
A[�Q�a�����O�(��zb����!a���C_7�����;\��Ĵ�w���\�[�tNy����L�\`W?)j����l�>҃�?�=P������c.�n�X
��]�߾�uב�i�������1fZx{�;y;Z��>�B~��_���v	Է��Oʑ3�"�x28PBgHǰ+.�!���Lt0�7$j����������N�v��ֱ/mI��&O������e����]�A[.�:��A��%�:�8�g� �tJt���jY/��ɔ-5�?3��¡C8�C:gcQ��h�n��Z%Y̲+���8M��\��V�����|��\ғa�_.���v�6���J�b�V:߲�lT� G!���ƛs�'�V�;�m˲一�AI��:LM��-���a�^�d�޳5���=B#�5��k�X?��T�7<8�C��ȗ?�%�ܶݑ&P��7�W�+�=���kLwN˓;V!S�\��@�'�ν��`�M:Y�}�b������XgҌzW�\dLmG1�����F�Gq�:2��=�1D����܃�����ȣ�s�ww�$a^����>�'����5p�0$?GF;=e{���*:qo�4Iwu3rq��g˜�i3�l�����WK�YbC�W�V�5��gw��������R ���M� �P~ؘ�X_N,�|˾���d5���x�?(D�4H�	VD�s�����G��A3)�agO�}�7��%�/�@L    �
4T�9`@��YAe����>�xNf�p49z�>�I���b���kC���
���W���W�s��N��3*b�AL����X�T�l<��L����0},��������P�����/�.�?�o����ܶ���I���9�d{��^ʁa���e}���孶1�E��A�NIs�'>��*�{EJP���u� ��W�?��k�˫�Fċ�u�X�'�N}���ƙ��p��P�b��I�Pd�w2�G��?`.�ܹ��P:��`(��]�#�vևe�A�ņ��~2y$m�)��o����w���'����sr�u(9��WZ��5�D�E��Dȭ�M<��@y��?˘�g���
-��z~�^��y�v��?h��ܢ�d����� X7=�:G���e��W)�/m��ۭ m���j�7)JfË���4p�M��_�
_��s'W�Ej�:W}��V�w�����|�\� ���)��M>ݢ����/T����_.�����#Y��Jh���V�@"���!�6�۟u�\v"�q�O��M�t�K����8����Ke�ч��mW��uL��]&�R�,!�:?שŊ.5�����z���Iw�v��+��JG��)*�����o��ƪ�ъ�]�v�~f��r�3�I�&8q�
Q\\�����~VĘ���Tv�P4��n�;e���Tvv�����N/�� �X��Mh(;�M죤3k��E��p%�y�?bo^�2��/�å��nm��.�?���T�i3�S9��m2����c<�6�>?���C�P)C��G���|��£�T���N��3,���uO)�qgu����ŀ>d�,�~WM���}�^��uUIh��.fz�Ǥ�;�ey��D!��6f����q�j>��G�9J8�������en�)�.�?ɖ��Q���x)6���*�[0��>Q��~_��U�(�F��E�,1��^.0;]g��e/�#�:�@�MQ܄D���>mK��EW��{"Z� s�~_��ǹ0���@�4��ԗ��\;W+�l\���b�Ӷ��-��l.�%�HC���,ǉyяE(�p�|j�����M�S�C��:��xˋ�����a�Q$��
`-:r���Y�3`/ݤ�t�1>;$9��bt�jae(�4"�t����������K7��ۅ[��0H���	m �&8)���S�}�o�*���.Z����$�m~9���{$�#^�Z���^� �*V��]�>�p��_h���3D�ݸ��UG[a��'�� �B��C���A�&a�jX��}{�(��)�<�����oO 6`�N��G� �5p�'��Lx~(������{�@60���R���Гt(_	��Z��6�i��Kr03j.����&�HB�,���ֲ��1Z��I�ŎS��7�gY��z�u����.�l���Xpl�����yXI���%t�'��(V�Y��:��@F�@�T0:K��avf0�[YR�M��zĬE�`�P�՜z�<g_銹�"���+�{�]��6V'��=.�׿���d��g7/n+��:v Z�v�L��@��e�}�f�xM_�� ź�^4J�1>X����z[�FNS��4�"��A�H���F�"�/�a�y���c�< ��fl�[ =��q�+�
��b-<��lnHA��G�	��8��TT~���`��ra�;��؉6��sS����1���R�w�P,��*J��R��:���r�V�
N]��:����\��P�*>�;c�e�8L�t;V�Ts���'��^@����`�����FQ4�w�fs4�e��Τ��I	8py���s��?�^U�Ǹ�4U�l�o�:��`K�
�]�G�|-B����7���&^��Р����N[�,F�o������O�\
0�����ge_;.�V�����K� �@1&���:Ue����qxx�U
���S�V�2��a$�����&��A �d+Qp��3&L�ߩ��*⥰�6uQ� b�S}a��������|Մf�]p��՛�q�u����"ku�Pc�����?yĻ�N��j�k��r��9�k�)'��yj��_ �kMRc��fC�r���z/7��fC�r����<V�}Ш(7�:F��J\`�k�M���E�?+�XD�=4�/�����{�������B|8�\d�`)$w��xy��Xˏ9��	���E0�8�F����AcGOI���_U���T���! ��=�	���B�X*^j��(�rE_*�t�3�K���o�v	ڝB��e[��n���O�Z^����y�D �LZ�g�m��K��>����x����R��c-plG�-<1�� ��
�o���4�ؽ�n��K-?t�-�e{�.�EL��|�R)�9�"�`'?��B�Q���c�(�d���؈:s`�c���.�긝�"g�~�}.��N�sMs����橖��j.BT���Z�gLj �a�������+ܭ���Y����������ۆw���g;�o�c9`�}���I���p�5�Kd�'��Ѱ@�X7HƣK��S��,��
!����f���𮸑g_>YQ��^uG�f���Kv�6ي�@����9&�L�S��X��X���b[Rۏ��� 8�H'7�}@zV��F�x�������O�����v3J���V$��ij�'�W�nl�c5���_��~f��g,�才�9�C��y���EA�k�3��9raʵ����PZ��O�r�7tz*�����B��*��]�	���ʚs|��C1�x]�l&���R]��%�O��ݹ|��`H���H��#kfWq�p��읮�9���I��W7����KL�<S�f �|��0��ʙ��Y�Jo�r��hA@�*�W�Qs4m�a��Q2E�E؊�:4��ո�I���>z�o4��N@F��aDz7D#a�S��tJ���5���~2��S�N�e�o	��d��X!�����Mv~��Ѷ>�=�X*�m�ˋ�ED�Y�PI��^t'��l��8�O�+�__/*��[�\}O����|�G�zD���w�7\	M��@_.��4���Poer{5�p�q w2�5�l�`f%���d�)�E��5���@{��@5�i��2kb���+�KX*,s|g�d��iQAK	^���@kYz�/�G?�xC��.��e؇�:�ɞ�d��Y���yT%ݣ \*�oR���ղ�~�����uNшҌ�O��CP��o�m!��8B����A�؞�5�i�q�������,Fp����x��j�r�vΌ~@%�q���7(��� @kCٹ�t+��{��Df� 3�����ZrƨŃkʉ���?qB�.h8N�}"X�x�w"�|���������h�"B�=Y���B"st�Y=��8�}uO�{!-�jƊ�+Z��k7���Ώ��~��#;�t�����^����Sr� 5a"�V�g�9��5D���o��)^`��E�����9a����y��_l{\�q�2W�����Y���E��C�y<��6�
��_!T��X���8@f�A�+�&^)va
S6��eW� �ˇ���@�+3��G|�?��'�� �$E��.�K�\�D�%��V��]�E�(k�Y+�emP�WB���;�$ц{���1���1�'c�뺫O��Uuu��"w�\?g��J�ܬ��Ny1�f!�d�D ~x��Xᛮ ��F���\�[%0�R�YU�]��W>4�!����!�P7l
nC(�+'����/)��*Y�3'���E-8��9{��Kƫ+���VXǒ�!J��"}�,暙��*(A�O��E��Kk����G�xrp��4v�;�tX�^�+ �%a����4�4���W�[���.T�e��OkJii$*6s�=�ajw�*������ҥvr�����޿;�i=]�<_��k�C��R�7�����:�Y�w�N�	|��J}pW�ɾ���q(i�����������*��ˠ����    %�.��z7�"Sh�鼂����,�qOtJJ�Ot�s�4m����܉��Ԟ'�4�N�aH�\��]�z%Ze*Kѝ�fa�Y'�X��6���`&-�ϊ'�0��U$�I��O�I��*�$#�I7z��f�6N�fS�R\�K�G�l��̙A)�LV�^Z������ec�z��?�����r!�j1�;�Uݫ��E)g��o�"��t�8�3;�tl�������,�9:���gv�b���-sEꗳ�=tB�	�����Qۥ��8�RM�EA�3���׺�Z_��${�*�P��fΐٵUZVW��_�gv(1� $�J�����A^g����4;{j'�������+oS�:?Z@j��Svy�n/���� �,!��2n؀�-�R�d���b�+L��)�7M��#��Uo�j�X�U�8�A�"WJ�.��.!��TI�ւߐ*P�Gp��0����I��_Koq&��e�0�fe�W�(d�*-���"k�R��S׾�7�5�S�����r�Y	�zO���I�n?�byx�zV�9�8�S;����,ߓ�������z�zu��;��pS��O�6=ݶ3��ɚ}P�g�C^��ܤD�(�LՓ?��D�:�f�YxZ�	��VU��JN�<ٔ�1���h���C�<�\ԙ�?�D�h�$3ZoW�5����+�X�v?�+�O��5�v`E����@+���w&���'6� �C�����J�f̗�U�kJ+,-�=��WG/����
1�[�9�w��J��{�T��=��Rh�tz3)��CQ���5֝H�=���P&���P���K�~E���NK����E]Gʣ�:/^�6U-��B�� C3��P�So��-C��_��"2� -z���$����mBR�G,��������0M����	����ǎ�LF�󿊥1��9��Ț��y��g�r�	�n}�������C�`��e����ׅ|�l�g�@�zu��S�Mo�,&��ζ�QNgl88,�`O��jO����̳}̰�JS�� �B��!ʗ�_2n��ղ<7c�ж�<�İ��4��I�.�GoV����.&1��W�h�)�^��EҖ�9�S�2F)%WN!�ъ�ъ�&B�B2ZY6?-�rݭ!e���3]J�P�1�(u��ˏ\��}\e��V|�x���d�~L��>�䦣'�$�I�=��3>�[*��TW�좆)Md��N^y<8d/NG�P�5�O"0U"�$��]�]rU_����E�{*�)�N�5����_�Wi�%D��������[��C�k�!i���o5�vs�}J����U���f�֗]�Էbf=���7XcP��5J.�jTq�A��s73dWP̒IE��{f�N��▋Zڴ�է2��1q�a�܈��;�?!~9��߬��yzi߭�6���)�A�T1���`��Yx9�E�6a��Ti�S�m*�i
L� �~�����9�Ox_ݦ���Jo'���r����;ᩍg@a)��t����3T�E��L���a�!� eפ��"�� Cg�3QE�D�W���j�W�L~�	�P�E~���QXc��ڞ[ࢦM����V^�f���R�w�Դg�@���Z�}��y@Q�a�9�㑸(�K���}�`_�nG��~�~�;�����UGi������R�*m�V~�
�	��8�JHv��n�n{Y ��V����ȁ�V�0VH����^	g��";�P��x�f䝃�UE��r]�
6XB�2_%bӸ�+Uz�8������M�i��qN��NB�����g�����+5U���aN����{��3��;%��h�ݳ�ҽ��e�Uֹ�}3|�˾u!.��3<3�!�d��J/v�4F�3w?C��R����[w�-��X����PT�f+ԝ�j7Z`������w��O�!
����Y�^��*�Q�Iw�c��|ϋ�_q-�KƖF��Um��S�$�~��Lr0_;�;�K�I�>"$��X��~�)m{G�V�~��"5���!䒇?����Hs>F���V�I��k>�j����+���EaZN}������b�_�ɥ���I��x{�H�%�q��֩��Av:5��Y�%�xV6+���.�����ݛ���̇?�<�T���Q�=p�^|�t���������:6z��3o��S(c�c�f�u8�Х�LzԎ� 	��{����Ǡ�V�J�������"=4=�U�<A��RO�K�c�<�C��ڭ�/A��!�8B[��S���8���V�!hȸ����~�|���Rp��v�ة �W�H`�*"{o*�*x.#i�ΦS1D;��mX�멻��[Hm62M|�(�u��@�5=���PҌ�?g㉌��e�(P���6]�*8j���nkb�N!�
ls��y9�x@����D��V��q83�����$b�RE~dC��}&��y�잤M�_Υ�e_1Դ��5�e�4HvgD�j��2���#������{��YLf��嵻�L��8�q�&M�D�A`���~��MoVHI=�X�d�����G'|�3d�����8S&h�mKp	+,����;�^)�G�Q�1|�eKlXN�\�����B���ԙI̢oJ�3?��Ai\k� 0{��>8��k������a������(f�[�x�I� FN��"���u��ߍ�y���+��iԋw�����W��}����r��D���i�K�W�6�����(�G1,?�Ï�ch\�%,���� ��<<�Lȵ�UP?KD���qQ�A�������|������Xk�NLT�d¼�h̧DXK���Қy�*��#�����]p��445���p\���*�y,fͯ�)7i���n ���H� ���d4#�q{pG-�[�nN�<=��� z.8gĬq=cYq��w�i�NC�8��=�����H���tnOвW�u���*�'��Rk#��̑1I�:����x!ꔭ����kIQ��G��ԯ�R���0>g6!A������SefF�f5F'�p�5��Uh;sj>�ݞ>|]�:��^�1٥�בZUŎ���0��*z�N/=ut��)�)y�ﲑ�G�������0��+�^��ϗ%���WK�X���Y&9�ZQי�6�n8��z�&[dk�ǇK�xl�n�Ǉ|�ji����zR��*}y��~���9�^��J��B:��6�\���F�\�����p QfX�kA������Tju���H�#��G����ܗ�V�^M�r�m(GU�u�FPӸ� �if�k�-���P.�V/+�\�t�d�+�2�||�t�Ub�%�d�?-�b\n"�Ds*��{�!_oe��KK����{�uo7��4�]O����vNoM��lಓzhϻ8<x5NZ�����R�$�BWzc�u}�?rOkI+�ʄ�.�a�����˅���*8m�����b�o'��o�G�����k}l����M��`6a��O�_nB�Y뮲��.2���P����f�T5L��?^�##��X�e����*FH�v�ʥ�_ιk�V�u���m%}�MOBD�]|��EC=�X7�cl$~%����F���b6b�N�zz�����cC�R�zu:��)P���ʀA�s�)���D�H���=BF�*橚e��:���O�H���|��s��oY}M
us�|ͬ������e�B�K�d2b�v3A���2��n��{�C7���ǀR���Kّ��EXxЪ�r{��L�C�����A�`���nYh���?����b��ZV��h/������ϓ56�ԕ�iV�ZK�C%L�)�L�C��8��;����H��v��3���p"�-{r%{s����C�%5��:�0I;DY��7m�o�eg� v�C�g���jU��d.� {d��*;	=�a��I7T[�.� '�O��i/a�h��DCo�ۊ��on�nv��=�PdE[L�6��D�^ũFz��c�Bq��+] ��=�u ��d��պ�ˏ��m�1�kI'@H�|���_����>�b?����J2�Eh|B��]R���f����Z3&��yO������$�� .  /ϫR=&a���$ROkd�i�(+��A��a֍���y
bQ�7J˩�ͨ^UN|r�鐏*�1�D�"+!�޹�5���p�n���S��X:���H�bh٧���Lzn���3/��&5��қ�O`���2=Ki����HZ1]�V	��bA$6;��J�[Uܖ华<����� �>Ovړ�F�x=�g�Z������ ������-u��r���^E�F�h�4����V�~��JmcŨ��#���o��P��K$u7ζ#�톻Bw������n�⁓Z,sʻ�w'n�Θ*R���ғO��,���	i!��z�f[�T@i��'�b��癋�q�ٷ��uǖa@�jm���rx�r�Ij����ܑ#�b���3\	f���cG�y�mx�;2�_��j(��y���旂%�����d�<2�S�	��7��2��(mYv�L
�i�}����3SƯ��T� �;�w�1�ZOU�G*4���'��k�gψgL�&��}~h�OV@s�Z�.�oi#2G4��p?���:Vԧ��4c
mc!��\�yT����)��	����g*G�P�G��v�zⓁMNR���z�NZ�z˧�_��vځ3~��AҫSմ�',F��:<j�<�Y
���ڍ�*����6/U������q�+�A�lZq�;]{�/{c�:ԏЬ��w�r\G���w�5�>�1,�c�s��ZY��O �0E����M�������D=l�RF�������l^$ZJ�;��d����rW�W*��k�2�|Kj�'`��������dX��GLM^�섒W����L�o��*�$��*|V�m�2mRE�M���@�p�����H@G����R�u6} j�-X2����qJ�^�f���+��S��*�M2�ˢ8�����q�(��=� X2Y���o^r��D�9�C/��%a.�bm��\�V�2�=��L-A+��%?U�p˒�%;���:�X���f��GE�F݀`�b�9~��lES��I�r%�5��/^��p���6"�3�)�I.~�z�Cc�X�,�|�9R�����������cpj��� �xgR_X�Q�ב�`�m}�*�nE���n�g�n��u���-]N���F���������F�Af�.���3$�\lcMAx�]�{��K2��oFL��i�j�;bd�w�Q�j��m��y�[lp�c���Uv�R������� ֮7U�b�9�@@k�LG�~�|����K���M��p�W8�@��-����:�;!\4ԺĐmx�Uf�	^+��b��b��.U�K�;vU��@���e	���K֪�~���"���/gIR�s!����!%��U�=]+ݣ�*�f�k��[I����FJ��^�9K������V�(7�{��DQUݹ��`a�7�{K���W����@�Y8�Q�y�j����~[m߿%8���2tK(�
|���BCJ�0�XCi�{����j?�9�[�>�n
3����$F��c�-Fu���������+��%!�3X|o�Տ�_�wi��� Vot��0@�ɓ@��b�QX`��Qk�c\ �!�����=%�G�ͅ�0���;�Oi�;��9X"��Ӭ�Vey	fͶT[�c���zq��Ԏ���o��D�Ĳ��>��@@3K0y%F�����!t6��b`[�\y���qh�I�����VQ4�ȸ�P��r��e���l����L���(�[��g�S��{�c�崵�~�}Of�B� P��'lӳ:]pO����yȣ��P�i,�<�Fl�|�q�EL��}0��S�W�_��k#Q`z>��r�+
����(w���mH���_]�Ն���&Byc5�t�ӂ@)ZL3��U�Ax�d�m�(cq_�~�p��}�0~/��\��� ����G~�I3捰Q���X�«hN�Ɂ�t~F�{�FP�	��+�faT�����)+�r��c�';_����h��aZc��	W�?��,�kaZ�G�]�|���^�I�	sOL��Rqؿ-|�BC����F�8{D�ӟNo>�ѽb���@ӏ ��s
ƆZ�L�cB�����̅�	����u��U|
�g��`��*I�<]->�.}���v�}��W�"�M�����b<#�����km�
�[���w��"q�����@[I�jK>��B��F�F��{M+�Xg2nx�����g���l�(��?���ʥ�"�P��̃����W��v�1�v�n>���gdFz��D6�m8ka8�gľ����''�t�sH��Uκ������w}�R�p�ڔ�oU�p���dY~h�) p��I^՟���,�q���� 1Yi:�bn�3����p5#�<�db�&�ڇ����+,����EW���b%�@^�����y����dG��h/��',�N��t*:��a0u�9��&E��۳��r��&nK�+ͺP���X�!*�cZe��V)����I��f�t)�Օi���F��|�Ws.�r�ZY�Hz��?�����`�,�)?�D�l��iaZ��,��wB_n}a�8�h{兒@Zr������>��H٢T���vO��3��p��Β��u����p�Ƒo��}d����a�S���|QW�Y�MI��C����$Ur�A�뱸��Ddnn���y(9���	�2�!z�h�����]D?�;����A��~@��T		�ؓ��x�5do=�����g�)��D��Ǖ�k�v�O�i�D`����x�uj�5�b��ݥ�q���]��_�i��/S�y���gf$���6<�a��f���|w�x��F�oS��|D�-����q��(��,�뼱�,�w�-��!�_���(4j��9
��_.c����&UJ�8ͱ���ɱel�}@9���1&Fl�g���&ʚ��Z���R�Z|aso�1fm�֖��&�}^})�.���0�n�>�\��s'Ua��?��6(��XAA����ڐ�J�_g}��Q//+�n��g������?�w��I�b�u&گe�F�����Rα'y6�9�Lapk��>j(��_ø	If(a-M?AV�
�i�E�����F���i(�뢉O�Jm{Ӫu"����GA��ѕ�:;n�z�T�&Q�WUQ��(*���Nό��[ѝO�����-W_��������ȸ#�es-n�ϋII#�|a�GJܗm������Ú���>�X�Cӛ��w�����.�!V|��o����^�����ey�APU��
ĝ��G3U��Qr2|�P�5�\�X��E�n.C�>���'��zd4�m�Q>*�;x���O����d��$�`�i� �Ex	r�f[Lw{��Y�Bb��L���wu�N�D@eG��NQ�g�Bۛ�3�Z�o؛[�įW-W.�X,�ʼP ׮����z�2=k�N�W�	�:�3�>c��_h˸nEű&-����V��\,�S(�Y7�z5cm�b��gZ&:��ɴX3�BL	Ǘ��k�-���5��L�[��N�`|Pfͮ\��֮�����+���
Q�:M�:�V�:Iyu!4h+�e�Dځ�I�c�9YOc���|�Ym8��T3+������Ex�H9X�T&n��o���������?��hC�*         ^  x�m�Ko�@ ���;<Â�˭� +q����!l����뛴�4��'_&#�#)�pd��9w�AlN�B�u���}y���I,��c���S���e��*&�;qX�'�$����H�cݜ����r�-�l�N�τpV��~p�E}�n�(�[����AG���l���e~U�Z��a�X�v�w?�R�'p������l��k��T�Å�y�nL���VO�Ҍ�FJ�7�s��@�P��ׄ������qtK��Zӧ��7�K�C���5��5ߝ_�sU0�-�J�uڈ�|�p9,�ym���y١����*�'�����|T N�"#EV��������2���s��:�     