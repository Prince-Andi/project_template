HALO HALO

ALUR BUAT KALIAN:
1. git checkout main
2. git pull
3. git checkout NAMA-BRANCH
4. ngoding
5. git add .
6. git commit -m "pesan"
7. git push origin NAMA-BRANCH

ALUR BUAT GW:
1. git checkout main
2. git pull
3. git checkout Andi
4. ngoding
5. git add .
6. git commit -m "pesan"
7. git push origin Andi

8. git fetch --all (ngambil semua branch)
9. git checkout main
10. git pull
11. git merge Andi
12. git push

git merge BRANCH-TEMEN
git push

KEMUNGKINAN YANG BISA TERJADI / BUAT JAGA2 AJA:
1. Lupa git pull sebelum ngoding
cara ngatasinnya:
    git add .
    git stash
    git pull
    git stash pop
atau
    git pull --rebase

<<<<<<< HEAD
=======
2. muncul merge conflict
Karena (misal):
    README versi main ada isinya
    README versi andi/all-in-one juga ada isinya (dan beda)
    Git bingung, yg bener yg mana
cara ngatasinnya:
liat yg ada tanda begini:
    <<<<<<< HEAD
    (konten README dari MAIN)
    =======
    (konten README dari andi/all-in-one)
    >>>>>>> andi/all-in-one

Pilih mau pake isi yang mana:
    1. Pilihan A — Pake isi branch andi/all-in-one
    Hapus bagian HEAD, sama tanda-tandanya.
    2. Pilihan B — Pake isi dari main
    Hapus bagian bawah (yang dari branch lo).
    3. Pilihan C — Gabung manual dua-duanya
    Terserah lo mau gabung gimana. Biasanya README sih digabung aman.

TRUS COMMIT KALO UDH:
git add README.md
git commit -m "fix: merge conflict README"
git push

klao masih di main tinggal push aja
>>>>>>> andi/all-in-one
