# Git 문법

## Revert

### Git revert
특정 commit을 없었던 일로 만드는 작업

```
git revert <commit id>
```

### Git revert 작동 원리

- "재설정"
- 단일 commit을 실행 취소 하는 것
- 프로젝트 기록에서 commit을 없었던 일로 처리 후 그 결과를 새로운 commit으로 추가 

### Git revert 정리
- 변경 사항을 안전하게 실행 취소할 수 있도록 도와주는 순방향 실행 취소 작업
- commit 기록에서 commit을 삭제하거나 분리하는 대신, 지정된 변경 사항을 반전시키는 새 commit을 생성
- git에서 기록이 손실되는 것을 방지하며 기록의 무결성과 협업의 신뢰성을 높임

## Reset

### Git reset
특정 commit으로 되돌아가는 작업

```
git reset [옵션] <commit id>
```

### Git reset 작동 원리
- "되돌리기"
- 시계를 마치 과거로 돌리는 듯한 행위
- 특정 commit으로 되돌아 갔을 때, 되돌아간 commit 이후의 commit은 모두 삭제


### Reset의 3가지 옵션
- --soft, --mixed, --hard
- reset은 과거 commit으로 되돌아간 후 되돌아간 commit 이후 commit들이 삭제됨
- 그런데 삭제되는 commit들의 기록을 어떤 영역에 남겨둘 것인지 옵션을 활용해 조정할 수 있음

### 옵션 별 동작 원리
- --soft
    - 삭제된 commit의 기록을 staging area에 남김
- --mixed
    - 삭제된 commit의 기록을 working directory에 남김 (기본 옵션 값)
- --hard
    - 삭제된 commit의 기록을 남기지 않음

## Restore
### Git restore
Modified 상태의 파일 되돌리기

Working Directory에서 파일을 수정한 뒤, 파일의 수정 사항을 취소하고, 원래 모습대로 되돌리는 작업

```
git restore
ex) git resetore README.md
```

### Restore 주의 사항
- 원래 파일로 덮어쓰는 원리이기 때문에 수정한 내용은 전부 사라짐
- git restore를 통해 수정 취소 후에는 해당 내용을 복원할 수 없음
