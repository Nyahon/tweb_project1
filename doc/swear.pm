package Text::Swear;
use Exporter;
@ISA = qw(Exporter);
@EXPORT = qw(checkSwear);
use strict;
use vars qw(@ISA @EXPORT $VERSION @badwords);

$VERSION = "0.02";

@badwords = (
"b[l1][o0]+d(?:y|ie|ee)",                            # bloody
"[5s]p[\@a][5s]t[1il][ck]",                          # spastic
"bugg[e3]r",                                         # bugger
"j[3e]w",                                            # jew
"sh[\@a]g",                                          # shag      
"tw[\@a]t",                                          # twat
"p[\@a]k[1li]",                                      # paki      
"b[0o][l1]+[0o](?:ck|c|k)[s5]",                      # bollocks
"sm[e3]gm[\@a]",                                     # smegma
"n[1lia]gg[3e]r",                                    # nigger, nagger
"b[\@a][5s]t[\@au3e]rd",                             # bastard
"(?:f|ph)(?:[u]+[c]?|[o0][o0]+)k",                   # fuck
"[ck][u]+nt",                                        # cunt
"[5s]h[il1]t",                                       # shit
"b[\@a]d+[\@a][5s]+",                                # badass
"whore",                                             # whore
"[\@a](?:r[5s][3e]|[5s][5s])h[0o][l1][3e]",          # asshole, arsehole
"yoma[m]+a",                                         # yomamma, yomama 
"h[o0]+k[e3]r",                                      # hooker
"p[e3]n[il1][5s]",                                   # penis
"vag[il1]na",                                        # vagina
"m[o0]r[o0]n",                                       # moron
"damn",                                              # damn
"(?:ph|f)art",                                       # fart
"m[o0](?:f|ph)[o0]",                                 # mofo
"[5s][e3](?:x|ck|ks|kz)",                            # sex
"[5s]h[il1][m]+[\@a][t]+[\@a]",                      # shimata 
"l[il1](?:ck|kk)[e3]r",                              # licker
"b[il1]tch",                                         # bitch
"(?:f|ph)ag",                                        # fag
"p[e3][ck]+[e3]r",                                   # pecker
"pu[5s][5s](?:[e]?y|[e3][e3]+)",                     # pussy
"[5s][l1]ut",                                        # slut
"mutha",                                             # mutha
"turd",                                              # turd
"c[o0]ck",                                           # cock
"t[il1]t[5s]",                                       # tits
"[\@a]n[\@a][l1]",                                   # anal
"h[e3][1l][1l]",                                     # hell
"(?:d|pr)[il1]ck",                                   # dick, prick
"[5s]u[ck]+[e3]r",                                   # sucker
"bar(?:f|ph)",                                       # barf
"[5s][ck]r[o0]tum",                                  # scrotum
"c[l1][il1]t",                                       # clit
"p[il1][5s][5s]+",                                   # piss
"[c]r[\@a]p",                                        # crap
"d[o0][u]?ch[e3]",                                   # douche
"vulv(?:a|uh)",                                      # vulva
"l[\@a]b[il1][\@a]",                                 # labia
"[5s]p[e3]rm",                                       # sperm
"h[o0]m[o0]",                                        # homo
"[5s]m[3a]g",                                        # smag
"[5s][kc]r[e3]w(?:y[o0]u|u)",                        # screw you
);

sub checkSwear {
   my ($string) = pop (@_);

   foreach my $i (@badwords) {
      return 1 if $string =~ /$i/i ;
   }
   return 0;
}
